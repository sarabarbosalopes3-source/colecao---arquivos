import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Serie


@csrf_exempt
def api_series(request):
    if request.method == "POST":
        dados = json.loads(request.body)

        for campo in ("titulo", "plataforma", "ano", "avaliacao"):
            if campo not in dados:
                return JsonResponse(
                    {"erro": f"o campo {campo} é obrigatório."}, status=400
                )

        ano = dados["ano"]
        avaliacao = dados["avaliacao"]

        if ano < 1900 or ano > 2026:
            return JsonResponse(
                {"erro": "ano deve estar entre 1900 e 2026."}, status=400
            )
        if avaliacao < 0 or avaliacao > 10:
            return JsonResponse(
                {"erro": "avaliacao deve estar entre 0 e 10."}, status=400
            )

        serie = Serie.objects.create(
            titulo=dados["titulo"],
            plataforma=dados["plataforma"],
            ano=ano,
            avaliacao=avaliacao,
        )
        return JsonResponse({"id": serie.id}, status=201)

    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)


def resumo(request):
    series = list(Serie.objects.values())
    total = len(series)

    if total == 0:
        return JsonResponse({"total": 0, "media_avaliacao": 0, "melhor": None})

    soma = 0
    melhor = ""
    maior_avaliacao = -1

    for serie in series:
        soma = soma + serie["avaliacao"]
        if serie["avaliacao"] > maior_avaliacao:
            maior_avaliacao = serie["avaliacao"]
            melhor = serie["titulo"]

    media = round(soma / total, 2)

    return JsonResponse(
        {"total": total, "media_avaliacao": media, "melhor": melhor}
    )
