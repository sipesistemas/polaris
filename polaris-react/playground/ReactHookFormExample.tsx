import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  Button,
  Banner,
  BlockStack,
  InlineStack,
  Text,
  Badge,
} from '../src';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  newsletter: boolean;
  terms: boolean;
}

const countries = [
  {label: 'Selecione um país', value: ''},
  {label: 'Brasil', value: 'BR'},
  {label: 'Estados Unidos', value: 'US'},
  {label: 'Canadá', value: 'CA'},
  {label: 'Reino Unido', value: 'GB'},
  {label: 'Alemanha', value: 'DE'},
  {label: 'França', value: 'FR'},
  {label: 'Japão', value: 'JP'},
];

export const ReactHookFormExample = {
  tags: ['skip-tests'],
  render() {
    const {
      control,
      handleSubmit,
      formState: {errors, isSubmitting, isSubmitSuccessful},
      reset,
      watch,
    } = useForm<FormData>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        newsletter: false,
        terms: false,
      },
    });

    const watchedValues = watch();

    const onSubmit = async (data: FormData) => {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Dados do formulário:', data);
    };

    const handleReset = () => {
      reset();
    };

    return (
      <Page title="React Hook Form com Polaris">
        <Layout>
          <Layout.Section>
            <Card>
              <div style={{padding: '20px'}}>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">
                    Formulário com React Hook Form
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Este exemplo demonstra como integrar react-hook-form com os
                    componentes do Polaris.
                  </Text>
                </BlockStack>
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <div style={{padding: '20px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormLayout>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: 'Nome é obrigatório',
                        minLength: {
                          value: 2,
                          message: 'Nome deve ter pelo menos 2 caracteres',
                        },
                      }}
                      render={({field}) => (
                        <TextField
                          label="Nome"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.firstName?.message}
                          autoComplete="given-name"
                        />
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: 'Sobrenome é obrigatório',
                        minLength: {
                          value: 2,
                          message: 'Sobrenome deve ter pelo menos 2 caracteres',
                        },
                      }}
                      render={({field}) => (
                        <TextField
                          label="Sobrenome"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.lastName?.message}
                          autoComplete="family-name"
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: 'Email é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido',
                        },
                      }}
                      render={({field}) => (
                        <TextField
                          label="Email"
                          type="email"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.email?.message}
                          autoComplete="email"
                        />
                      )}
                    />

                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^[\+]?[1-9][\d]{0,15}$/,
                          message: 'Telefone inválido',
                        },
                      }}
                      render={({field}) => (
                        <TextField
                          label="Telefone (opcional)"
                          type="tel"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          error={errors.phone?.message}
                          autoComplete="tel"
                        />
                      )}
                    />

                    <Controller
                      name="country"
                      control={control}
                      rules={{
                        required: 'País é obrigatório',
                      }}
                      render={({field}) => (
                        <Select
                          label="País"
                          options={countries}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.country?.message}
                        />
                      )}
                    />

                    <Controller
                      name="newsletter"
                      control={control}
                      render={({field}) => (
                        <Checkbox
                          label="Receber newsletter"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />

                    <Controller
                      name="terms"
                      control={control}
                      rules={{
                        required: 'Você deve aceitar os termos',
                      }}
                      render={({field}) => (
                        <Checkbox
                          label="Aceito os termos e condições"
                          checked={field.value}
                          onChange={field.onChange}
                          error={errors.terms?.message}
                        />
                      )}
                    />

                    <InlineStack align="space-between">
                      <Button onClick={handleReset} variant="plain">
                        Limpar
                      </Button>
                      <Button submit loading={isSubmitting}>
                        Enviar
                      </Button>
                    </InlineStack>
                  </FormLayout>
                </form>

                {isSubmitSuccessful && (
                  <Banner
                    status="success"
                    title="Formulário enviado com sucesso!"
                  >
                    <p>Os dados foram processados corretamente.</p>
                  </Banner>
                )}
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section secondary>
            <Card>
              <div style={{padding: '20px'}}>
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">
                    Valores em Tempo Real
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Veja os valores do formulário sendo atualizados em tempo
                    real:
                  </Text>
                  <div
                    style={{
                      backgroundColor: '#f6f6f7',
                      padding: '12px',
                      borderRadius: '4px',
                    }}
                  >
                    <pre
                      style={{margin: 0, fontSize: '12px', overflow: 'auto'}}
                    >
                      {JSON.stringify(watchedValues, null, 2)}
                    </pre>
                  </div>
                </BlockStack>
              </div>
            </Card>

            <Card>
              <div style={{padding: '20px'}}>
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">
                    Status do Formulário
                  </Text>
                  <InlineStack gap="200">
                    <Badge
                      status={
                        Object.keys(errors).length > 0 ? 'critical' : 'success'
                      }
                    >
                      {Object.keys(errors).length > 0 ? 'Com erros' : 'Válido'}
                    </Badge>
                    {Object.keys(errors).length > 0 && (
                      <Text as="span" variant="bodySm" color="subdued">
                        {Object.keys(errors).length} erro(s)
                      </Text>
                    )}
                  </InlineStack>
                </BlockStack>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
