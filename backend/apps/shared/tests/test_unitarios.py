from decimal import Decimal

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.exceptions import ValidationError

from apps.providers.models import ProviderProfile
from apps.reviews.models import Review
from apps.reviews.services import create_review, delete_review

User = get_user_model()


def create_user(*, email: str, name: str, password: str = "senhatest123"):
    return User.objects.create_user(
        email=email,
        password=password,
        name=name,
    )


def create_provider(*, email: str, name: str):
    user = create_user(email=email, name=name)
    return ProviderProfile.objects.create(user=user, is_available=True)


# Testes envolvendo a conta do usuario

class UserManagerTests(TestCase):
    # Teste 1: criar usuario com dados validos deve funcionar
    def test_create_user_with_valid_data_creates_user(self):
        # Este teste verifica se, com dados validos, o usuario é criado normalmente.
        # O esperado é criar a conta corretamente, passando no teste.
        # O teste falha quando algum dado valido é rejeitado e a conta nao é criada.
        user = User.objects.create_user(
            email="camila.souza@gmail.com",
            password="Camila@2026",
            name="Camila Souza",
        )

        self.assertEqual(user.email, "camila.souza@gmail.com")
        self.assertEqual(user.name, "Camila Souza")

    # Teste 2: criar usuario sem email deve falhar
    def test_create_user_with_empty_email_raises_error(self):
        # Este teste verifica se o email e obrigatorio no cadastro.
        # O esperado é que se nao tiver email, vai levantar um ValueError, passando no teste.
        # O teste falha quando um email é passado, fazendo criar a conta corretamente,
        # nao lancando ValueError.
        with self.assertRaisesMessage(ValueError, "O e-mail"):
            User.objects.create_user(
                email="",
                password="Camila@2026",
                name="Camila Souza",
            )

    # Teste 3: criar usuario com senha curta deve falhar
    def test_create_user_with_short_password_raises_error(self):
        # Este teste verifica se a senha precisa ter pelo menos 8 caracteres.
        # O esperado e que, com uma senha curta, vai levantar um ValueError, passando no teste.
        # O teste falha quando é passado uma senha valida, nao lancando ValueError.
        with self.assertRaisesMessage(ValueError, "pelo menos 8 caracteres"):
            User.objects.create_user(
                email="rodrigo.almeida@hotmail.com",
                password="123",
                name="Rodrigo Almeida",
            )


# Testes envolvendo review

class ReviewServiceTests(TestCase):
    # Teste 4: criar review com dados validos deve funcionar
    def test_create_review_with_valid_data_updates_provider_rating(self):
        # Este teste verifica se criar uma review valida atualiza a nota media do prestador.
        # O esperado é que, com stars=5, a review seja salva e a média fique 5.00, passando no teste.
        # O teste falha quando voce troca o 5 por um valor invalido, como 0 ou 6, e a review nao é criada.
        client = create_user(email="mariana.costa@gmail.com", name="Mariana Costa")
        provider = create_provider(
            email="joao.ferreira@studio.com.br",
            name="Joao Ferreira",
        )

        review = create_review(
            client=client,
            provider=provider,
            stars=5,
            comment="Excelente atendimento",
        )

        provider.refresh_from_db()

        self.assertEqual(review.provider, provider)
        self.assertEqual(provider.rating_avg, Decimal("5.00"))
        self.assertEqual(provider.rating_count, 1)

    # Teste 5: o prestador nao pode avaliar o proprio perfil
    def test_create_review_rejects_self_review(self):
        # Este teste verifica se o prestador nao pode avaliar a si mesmo.
        # O esperado é que a autoavaliacao levante ValidationError, passando no teste.
        # O teste falha quando voce troca o client para outro usuario e a review passa a ser valida.
        provider = create_provider(
            email="larissa.melo@atelie.com.br",
            name="Larissa Melo",
        )

        # provider2 = create_provider(
        #     email="italo.teste@gmail.com",
        #     name="Italo Nunes ",
        # )

        with self.assertRaises(ValidationError):
            create_review(
                client=provider.user,
                provider=provider,
                stars=5,
                comment="Teste de autoavaliacao",
            )

    # Teste 6: o mesmo cliente nao pode avaliar o mesmo prestador duas vezes
    def test_create_review_rejects_duplicate_review(self):
        # Este teste verifica se um cliente nao consegue avaliar o mesmo prestador duas vezes.
        # O esperado é aceitar a primeira review e bloquear a segunda com ValidationError, passando no teste.
        # O teste falha quando voce troca o cliente da segunda tentativa e ela passa a ser valida.

        client1 = create_user(email="bruno.lima@yahoo.com.br", name="Bruno Lima")
        #client2 = create_user(email="gustavo.lima@yahoo.com.br", name="Gustavo Lima")

        provider = create_provider(
            email="patricia.rocha@beleza.com.br",
            name="Patricia Rocha",
        )

        create_review(
            client=client1,
            provider=provider,
            stars=4,
            comment="Muito bom",
        )

        with self.assertRaises(ValidationError):
            create_review(
                client=client1,
                provider=provider,
                stars=5,
                comment="Quis avaliar de novo",
            )
