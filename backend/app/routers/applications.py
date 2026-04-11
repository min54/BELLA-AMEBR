import logging

from fastapi import APIRouter, BackgroundTasks, Depends, status
from sqlmodel import Session

from app.config import Settings, get_settings
from app.database import get_session
from app.mailer import send_application_notification
from app.models import Application
from app.schemas import ApplicationCreate, ApplicationRead

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/applications", tags=["applications"])


@router.post(
    "",
    response_model=ApplicationRead,
    status_code=status.HTTP_201_CREATED,
    summary="Submit an ambassador application",
)
def create_application(
    payload: ApplicationCreate,
    background_tasks: BackgroundTasks,
    session: Session = Depends(get_session),
    settings: Settings = Depends(get_settings),
) -> Application:
    application = Application(
        name=payload.name,
        sns_handle=payload.sns_handle,
        reason=payload.reason,
        language=payload.language,
    )
    session.add(application)
    session.commit()
    session.refresh(application)

    logger.info(
        "New application id=%s lang=%s sns=%s",
        application.id,
        application.language,
        application.sns_handle,
    )

    background_tasks.add_task(
        send_application_notification, application, settings
    )
    return application
