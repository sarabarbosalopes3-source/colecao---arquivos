import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Serie
# Create your views here.

@csrf_exempt
def api_series(request):
    if request.method == "POST":
        dados = json.loads(request.body) #requisiçao de dados 
        
        ano = dados.get("ano")
        avaliacao = dados.get("avaliacao")
        
        if not (1900 <= ano <= 2026):#validaçoes
            return JsonResponse(
                {"erro": "ano deve estar entre 1900 e 2026."}, status=400,
            )
        if not (0 <= avaliacao <= 10):
            return JsonResponse(
                {"erro": "avaliacao deve estar entre 0 e 10."}, status=400,
            )
        
        serie = Serie.objects.create(
            titulo=dados["titulo"],
            plataforma=dados["plataforma"],
            ano=dados["ano"],
            avaliacao=dados["avaliacao"],
        )
        return JsonResponse({"id": serie.id}, status=201)
    
    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)

@csrf_exempt
def Resumo(request):
    if request.method == "GET":
        
        series = list(Serie.objects.values())
        total = len(series)
        
        #verificar se está vazia
        if total == 0:
            return JsonResponse({"total": 0, "media_avaliacao": 0, "melhor": None}, status = 200)
        
        soma = 0
        melhor = None
        melhor_avaliacao = -1
        
        for i in series:
            soma += i["avaliacao"]
            if i["avaliacao"] > melhor_avaliacao:
                melhor_avaliacao = i["avaliacao"]
                melhor = i
                
        media = round(soma/total, 2)
        
        return JsonResponse({
            "total": total,
            "media_avaliacao": media,
            "melhor": melhor,
        }, status = 200)