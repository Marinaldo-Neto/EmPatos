import re

from django.core.exceptions import ValidationError


INSTAGRAM_USERNAME_RE = re.compile(r"^[A-Za-z0-9._]{1,30}$")


def normalize_brazilian_phone(value: str, *, field_label: str = "value") -> str:
    cleaned = "".join(char for char in value if char.isdigit())

    if not cleaned:
        raise ValidationError({field_label: "Informe um numero de contato valido."})

    if len(cleaned) in {10, 11}:
        cleaned = f"55{cleaned}"

    if len(cleaned) not in {12, 13} or not cleaned.startswith("55"):
        raise ValidationError(
            {field_label: "Informe um numero com DDD valido, com ou sem +55."}
        )

    return f"+{cleaned}"


def normalize_instagram_handle(value: str, *, field_label: str = "value") -> str:
    cleaned = value.strip().lstrip("@")

    if not INSTAGRAM_USERNAME_RE.fullmatch(cleaned or ""):
        raise ValidationError(
            {
                field_label: (
                    "Informe um usuario do Instagram valido, usando apenas letras, "
                    "numeros, ponto e underscore."
                )
            }
        )

    return f"@{cleaned.lower()}"


def normalize_provider_contact(platform: str, value: str) -> str:
    normalized_value = value.strip()

    if platform in {"WHATSAPP", "PHONE"}:
        return normalize_brazilian_phone(normalized_value, field_label="value")

    if platform == "INSTAGRAM":
        return normalize_instagram_handle(normalized_value, field_label="value")

    raise ValidationError({"platform": "Plataforma de contato invalida."})
