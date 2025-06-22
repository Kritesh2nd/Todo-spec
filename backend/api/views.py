from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Max
# Create your views here.


class TaskView(APIView):
    def post(self, request, action=None):
        if action == "create":
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid():
                max_position = Task.objects.aggregate(
                    Max('position'))['position__max']
                max_position = max_position + 1 if isinstance(
                    max_position, int) and max_position is not None else 1
                serializer.save(position=max_position, completed=False)
                return Response({"message": "Task created successfully", "success": True}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "Invalid Action"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, action=None):
        queryset = Task.objects.all()

        if action == "all":
            pass

        elif action == "user-all":
            pass

        elif action == "completed":
            queryset = queryset.filter(completed=True)

        elif action == "incomplete":
            queryset = queryset.filter(completed=False)

        elif action == "created-date":
            queryset = queryset.order_by("completion_date_time")

        elif action == "created-date-reverse":
            queryset = queryset.order_by("-completion_date_time")

        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(TaskSerializer(queryset, many=True).data)

    def patch(self, request, action=None, task_id=None):
        if action == "change-position":
            task_id = int(request.query_params.get("taskId"))
            new_position = int(request.query_params.get("newPosition"))
            task = get_object_or_404(Task, id=task_id)
            task.position = new_position

            change_position = -1 if task_id < new_position else 1
            start = task_id + 1 if task_id < new_position else task_id
            end = new_position - 1 if task_id > new_position else new_position

            task_list = Task.objects.filter(
                position__gte=start, position__lte=end)

            for task in task_list:
                task.position += change_position
                task.save()
            return Response(TaskSerializer(Task.objects.all(), many=True).data)

        if action == "set-complete" and task_id:
            task = get_object_or_404(Task, id=task_id)
            task.completed = True
            task.save()
            return Response(TaskSerializer(Task.objects.all(), many=True).data)

        if action == "set-incomplete" and task_id:
            task = get_object_or_404(Task, id=task_id)
            task.completed = False
            task.save()
            return Response(TaskSerializer(Task.objects.all(), many=True).data)

        return Response({"error": "Invalid Action"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, action=None, task_id=None):
        if action == "delete" and task_id:
            task = get_object_or_404(Task, id=task_id)
            task.delete()
            return Response(TaskSerializer(Task.objects.all(), many=True).data)
        return Response({"error": "Invalid Action"}, status=status.HTTP_400_BAD_REQUEST)
