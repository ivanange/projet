from rest_framework import permissions


class UpdateOwnProfile(permissions.BasePermission):
	"""docstring for UpdateOwnProfile."""

	def has_object_permission(self, request, view, obj):

		if request.method in permissions.SAFE_METHODS:
			return True

		return request.user.id == obj.id



class UpdateOWnStatus(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user.id == request.user.id


class UpdateOWnConfirmStatus(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.person.id == request.user.id


class UpdateOnlyAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS :
            return request.user.id == obj.to_user.id

        return (request.user.is_staff == True)


class JustGetIfAuthenticated(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method == "GET":

            return True

        return request.user.is_staff == True



        # return request.user and request.user.is_authenticated
