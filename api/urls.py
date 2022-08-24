from django.urls import path, include
from .views import CompanyView, Protegida

urlpatterns = [
    path('companies/', CompanyView.as_view(), name='companies_list'),
    path('companies/<int:id>',CompanyView.as_view(), name='companies_proccess'),
    path('protegida/', Protegida.as_view(), name='protegida')
]