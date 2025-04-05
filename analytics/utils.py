from user_agents import parse

BOT_KEYWORDS = (
    'bot', 'spider', 'crawler', 
    'yandex', 'google', 'bing', 
    'mail.ru', 'rambler'
)

def is_bot(request):
    user_agent_string = request.META.get('HTTP_USER_AGENT', '')
    user_agent = parse(user_agent_string)

    return (user_agent.is_bot or any(keyword in user_agent_string.lower() for keyword in BOT_KEYWORDS))

