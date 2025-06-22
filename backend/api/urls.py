from django.urls import path
from .views import TaskView

urlpatterns = [
    path("task/<str:action>", TaskView.as_view(), name="task-action"),
    path("task/<str:action>/<int:task_id>",
         TaskView.as_view(), name="task-action-id"),
]
