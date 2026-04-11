import logging
import smtplib
from email.message import EmailMessage

from app.config import Settings
from app.models import Application

logger = logging.getLogger(__name__)


def _build_message(application: Application, settings: Settings) -> EmailMessage:
    assert settings.mail_from is not None
    recipients = settings.mail_to_list
    assert recipients, "mail_to_list must not be empty when mail_enabled"

    msg = EmailMessage()
    msg["Subject"] = (
        f"[Bella Korea] New Ambassador Application #{application.id} "
        f"({application.language})"
    )
    msg["From"] = settings.mail_from
    msg["To"] = ", ".join(recipients)
    body = (
        f"New ambassador application received.\n\n"
        f"ID:        {application.id}\n"
        f"Name:      {application.name}\n"
        f"SNS:       {application.sns_handle}\n"
        f"Language:  {application.language}\n"
        f"Submitted: {application.created_at.isoformat()}\n\n"
        f"Reason:\n{application.reason}\n"
    )
    msg.set_content(body)
    return msg


def send_application_notification(
    application: Application,
    settings: Settings,
) -> None:
    """Send an SMTP notification to the admin. Safe to call as a background task."""
    if not settings.mail_enabled:
        logger.info(
            "Mail disabled (SMTP not fully configured) — skipping notification for "
            "application id=%s",
            application.id,
        )
        return

    try:
        message = _build_message(application, settings)
        assert settings.smtp_host is not None
        assert settings.smtp_user is not None
        assert settings.smtp_password is not None

        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
            smtp.ehlo()
            if settings.smtp_use_tls:
                smtp.starttls()
                smtp.ehlo()
            smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.send_message(message)
        logger.info(
            "Sent application notification email for id=%s", application.id
        )
    except Exception:  # pragma: no cover - notification is best-effort
        logger.exception(
            "Failed to send application notification email for id=%s",
            application.id,
        )
