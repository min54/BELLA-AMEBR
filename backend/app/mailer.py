import json
import logging
import smtplib
import urllib.error
import urllib.request
from email.message import EmailMessage

from app.config import Settings
from app.models import Application

logger = logging.getLogger(__name__)

RESEND_API_URL = "https://api.resend.com/emails"


def _build_subject_and_body(application: Application) -> tuple[str, str]:
    subject = (
        f"[Bella Korea] New Ambassador Application #{application.id} "
        f"({application.language})"
    )
    body = (
        f"New ambassador application received.\n\n"
        f"ID:        {application.id}\n"
        f"Name:      {application.name}\n"
        f"SNS:       {application.sns_handle}\n"
        f"Language:  {application.language}\n"
        f"Submitted: {application.created_at.isoformat()}\n\n"
        f"Reason:\n{application.reason}\n"
    )
    return subject, body


def _send_via_resend(application: Application, settings: Settings) -> None:
    assert settings.resend_api_key is not None
    subject, body = _build_subject_and_body(application)
    payload = {
        "from": settings.resend_from,
        "to": settings.mail_to_list,
        "subject": subject,
        "text": body,
    }
    req = urllib.request.Request(
        RESEND_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {settings.resend_api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp.read()
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Resend API error {exc.code}: {detail}"
        ) from exc


def _send_via_smtp(application: Application, settings: Settings) -> None:
    assert settings.smtp_host is not None
    assert settings.smtp_user is not None
    assert settings.smtp_password is not None
    assert settings.mail_from is not None

    subject, body = _build_subject_and_body(application)
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.mail_from
    msg["To"] = ", ".join(settings.mail_to_list)
    msg.set_content(body)

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
        smtp.ehlo()
        if settings.smtp_use_tls:
            smtp.starttls()
            smtp.ehlo()
        smtp.login(settings.smtp_user, settings.smtp_password)
        smtp.send_message(msg)


def send_application_notification(
    application: Application,
    settings: Settings,
) -> None:
    """Dispatch the admin notification via Resend (preferred) or SMTP.

    Safe to call as a FastAPI BackgroundTask — all exceptions are caught
    and logged, so a mail failure never breaks the application submission.
    """
    if settings.resend_enabled:
        try:
            _send_via_resend(application, settings)
            logger.info(
                "Sent application notification via Resend for id=%s",
                application.id,
            )
        except Exception:  # pragma: no cover - notification is best-effort
            logger.exception(
                "Resend send failed for id=%s", application.id
            )
        return

    if settings.smtp_enabled:
        try:
            _send_via_smtp(application, settings)
            logger.info(
                "Sent application notification via SMTP for id=%s",
                application.id,
            )
        except Exception:  # pragma: no cover - notification is best-effort
            logger.exception(
                "SMTP send failed for id=%s", application.id
            )
        return

    logger.info(
        "Mail disabled (neither Resend nor SMTP configured) — skipping "
        "notification for application id=%s",
        application.id,
    )
