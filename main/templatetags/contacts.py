from django import template

register = template.Library()

@register.simple_tag
def phone_label(phone: str):
    if not phone or not isinstance(phone, str) or not phone.startswith("+"):
        return phone
    
    country_code = phone[0:2]
    first_part = phone[2:5]
    second_part = phone[5:8]
    third_part = phone[8:10]
    fourth_part = phone[10:12]
    
    return f"{country_code} {first_part} {second_part} {third_part} {fourth_part}"

@register.simple_tag
def get_username_github(github_url: str):
    if not github_url or not isinstance(github_url, str):
        return github_url
    
    return github_url.split('/')[-1]
