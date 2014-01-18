module UserHelper
	def full_name(user)
		return "%s %s" % [user.first_name, user.last_name]
	end
end
