"""
Custom middleware for development environment
"""

class DisallowHostHeaderMiddleware:
    """Skip DisallowedHost exceptions in development"""
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        return response
    
    def process_exception(self, request, exception):
        """Catch DisallowedHost exceptions and allow them"""
        from django.core.exceptions import DisallowedHost
        if isinstance(exception, DisallowedHost):
            # In development, allow all hosts
            return None
        return None
