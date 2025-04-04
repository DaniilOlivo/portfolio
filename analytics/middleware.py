from analytics.models import Visit

class HitCountMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)

        session_key = request.session.session_key
        
        if not request.session.exists(session_key):
            request.session.create()
            session_key = request.session.session_key

        if not Visit.objects.filter(session=session_key):
            vizit = Visit(session=session_key)
            vizit.save()
        
        return response
