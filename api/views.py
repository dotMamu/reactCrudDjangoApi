from django.shortcuts import render
from django.http.response import JsonResponse
from django.views import View
from .models import Company
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


# Create your views here.


class CompanyView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    

    def get(self, request, id=0):
        if(id>0):
            companies=(Company.objects.filter(id=id).values())

            if len(companies)>0: 
                company = companies[0]
                datos = {"message": "Success", "company": company}
            else:
                datos= {"message": "Company not found"}

            return JsonResponse(datos)
        else:
            companies = list(Company.objects.values())
            if len(companies) > 0:
                datos = {"message": "Success", "companies": companies}
            else:
                datos = {"message": "Companies not found"}
            return JsonResponse(datos)

    def post(self, request):
        #print(request.body)
        jd = json.loads(request.body)
        #print(jd)
        Company.objects.create(name=jd['name'], website=jd['website'], foundation=jd['foundation'])
        datos = {"message": "Success"}
        return JsonResponse(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        company=(Company.objects.filter(id=id).values())

        if len(company)>0:
                company= Company.objects.get(id=id)
                company.name=jd['name']
                company.website=jd['website']
                company.foundation=jd['foundation']
                company.save()
                datos = {"message": "Success"}
        else:
            datos= {"message": "Company not found"}
        return JsonResponse(datos)
        pass

    def delete(self, request, id):
        company=(Company.objects.filter(id=id).values())
        if len(company)>0:
            Company.objects.filter(id=id).delete()        
            datos = {"message":f"Success Company N{id} deleted successfully"}
        else:
            datos= {"message": "Company not found"}
        return JsonResponse(datos)





class Protegida(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"content":"Esta vista está protegida"})