import React from 'react';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {PlusIcon, MinusIcon} from '@shopify/polaris-icons';

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
  ButtonGroup,
  Icon,
  ChoiceList,
  RadioButton,
  TextContainer,
  Divider,
} from '../src';

interface AdvancedFormData {
  companyName: string;
  industry: string;
  website: string;
  description: string;
  employees: string;
  contactPerson: {
    name: string;
    email: string;
    role: string;
  };
  addresses: Array<{
    type: 'billing' | 'shipping';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>;
  preferences: {
    notifications: string[];
    language: string;
    timezone: string;
  };
  terms: boolean;
}

const industries = [
  {label: 'Selecione uma indústria', value: ''},
  {label: 'Tecnologia', value: 'tech'},
  {label: 'Varejo', value: 'retail'},
  {label: 'Saúde', value: 'healthcare'},
  {label: 'Educação', value: 'education'},
  {label: 'Finanças', value: 'finance'},
  {label: 'Manufatura', value: 'manufacturing'},
  {label: 'Serviços', value: 'services'},
];

const countries = [
  {label: 'Brasil', value: 'BR'},
  {label: 'Estados Unidos', value: 'US'},
  {label: 'Canadá', value: 'CA'},
  {label: 'Reino Unido', value: 'GB'},
  {label: 'Alemanha', value: 'DE'},
  {label: 'França', value: 'FR'},
];

const timezones = [
  {label: 'UTC-3 (Brasília)', value: 'America/Sao_Paulo'},
  {label: 'UTC-5 (Eastern)', value: 'America/New_York'},
  {label: 'UTC-8 (Pacific)', value: 'America/Los_Angeles'},
  {label: 'UTC+0 (London)', value: 'Europe/London'},
  {label: 'UTC+1 (Berlin)', value: 'Europe/Berlin'},
];

export const ReactHookFormAdvanced = {
  tags: ['skip-tests'],
  render() {
    const {
      control,
      handleSubmit,
      formState: {errors, isSubmitting, isSubmitSuccessful, isValid},
      reset,
      watch,
      setValue,
      trigger,
    } = useForm<AdvancedFormData>({
      defaultValues: {
        companyName: '',
        industry: '',
        website: '',
        description: '',
        employees: '',
        contactPerson: {
          name: '',
          email: '',
          role: '',
        },
        addresses: [
          {
            type: 'billing',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'BR',
          },
        ],
        preferences: {
          notifications: [],
          language: 'pt',
          timezone: 'America/Sao_Paulo',
        },
        terms: false,
      },
      mode: 'onChange',
    });

    const {fields, append, remove} = useFieldArray({
      control,
      name: 'addresses',
    });

    const watchedValues = watch();

    const onSubmit = async (data: AdvancedFormData) => {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Dados do formulário avançado:', data);
    };

    const handleReset = () => {
      reset();
    };

    const addAddress = () => {
      append({
        type: 'shipping',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'BR',
      });
    };

    const removeAddress = (index: number) => {
      if (fields.length > 1) {
        remove(index);
      }
    };

    const copyBillingToShipping = () => {
      const billingAddress = watchedValues.addresses.find(
        (addr) => addr.type === 'billing',
      );
      if (billingAddress) {
        const shippingIndex = watchedValues.addresses.findIndex(
          (addr) => addr.type === 'shipping',
        );
        if (shippingIndex >= 0) {
          setValue(`addresses.${shippingIndex}`, {
            ...billingAddress,
            type: 'shipping',
          });
        } else {
          append({
            ...billingAddress,
            type: 'shipping',
          });
        }
      }
    };

    return (
      <Page title="React Hook Form Avançado">
        <Layout>
          <Layout.Section>
            <Card>
              <div style={{padding: '20px'}}>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">
                    Formulário Avançado com React Hook Form
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Este exemplo demonstra recursos avançados como arrays de
                    campos, validação customizada e integração complexa.
                  </Text>
                  <InlineStack gap="200">
                    <Badge status={isValid ? 'success' : 'critical'}>
                      {isValid ? 'Formulário válido' : 'Formulário inválido'}
                    </Badge>
                    <Badge
                      status={
                        Object.keys(errors).length > 0 ? 'critical' : 'success'
                      }
                    >
                      {Object.keys(errors).length} erro(s)
                    </Badge>
                  </InlineStack>
                </BlockStack>
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <div style={{padding: '20px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">
                      Informações da Empresa
                    </Text>

                    <FormLayout>
                      <Controller
                        name="companyName"
                        control={control}
                        rules={{
                          required: 'Nome da empresa é obrigatório',
                          minLength: {
                            value: 3,
                            message: 'Nome deve ter pelo menos 3 caracteres',
                          },
                        }}
                        render={({field}) => (
                          <TextField
                            label="Nome da Empresa"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.companyName?.message}
                          />
                        )}
                      />

                      <Controller
                        name="industry"
                        control={control}
                        rules={{
                          required: 'Indústria é obrigatória',
                        }}
                        render={({field}) => (
                          <Select
                            label="Indústria"
                            options={industries}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.industry?.message}
                          />
                        )}
                      />

                      <Controller
                        name="website"
                        control={control}
                        rules={{
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message:
                              'Website deve começar com http:// ou https://',
                          },
                        }}
                        render={({field}) => (
                          <TextField
                            label="Website (opcional)"
                            type="url"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.website?.message}
                            placeholder="https://exemplo.com"
                          />
                        )}
                      />

                      <Controller
                        name="description"
                        control={control}
                        rules={{
                          maxLength: {
                            value: 500,
                            message:
                              'Descrição deve ter no máximo 500 caracteres',
                          },
                        }}
                        render={({field}) => (
                          <TextField
                            label="Descrição da Empresa"
                            multiline={3}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.description?.message}
                            placeholder="Descreva sua empresa..."
                          />
                        )}
                      />

                      <Controller
                        name="employees"
                        control={control}
                        rules={{
                          pattern: {
                            value: /^\d+$/,
                            message:
                              'Número de funcionários deve ser um número',
                          },
                        }}
                        render={({field}) => (
                          <TextField
                            label="Número de Funcionários"
                            type="number"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.employees?.message}
                          />
                        )}
                      />
                    </FormLayout>

                    <Divider />

                    <Text variant="headingMd" as="h3">
                      Pessoa de Contato
                    </Text>

                    <FormLayout>
                      <Controller
                        name="contactPerson.name"
                        control={control}
                        rules={{
                          required: 'Nome do contato é obrigatório',
                        }}
                        render={({field}) => (
                          <TextField
                            label="Nome"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.contactPerson?.name?.message}
                          />
                        )}
                      />

                      <Controller
                        name="contactPerson.email"
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
                            error={errors.contactPerson?.email?.message}
                          />
                        )}
                      />

                      <Controller
                        name="contactPerson.role"
                        control={control}
                        rules={{
                          required: 'Cargo é obrigatório',
                        }}
                        render={({field}) => (
                          <TextField
                            label="Cargo"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={errors.contactPerson?.role?.message}
                          />
                        )}
                      />
                    </FormLayout>

                    <Divider />

                    <InlineStack align="space-between">
                      <Text variant="headingMd" as="h3">
                        Endereços
                      </Text>
                      <ButtonGroup>
                        <Button onClick={addAddress} icon={PlusIcon}>
                          Adicionar Endereço
                        </Button>
                        <Button onClick={copyBillingToShipping} variant="plain">
                          Copiar Faturamento para Entrega
                        </Button>
                      </ButtonGroup>
                    </InlineStack>

                    {fields.map((field, index) => (
                      <Card key={field.id}>
                        <div style={{padding: '20px'}}>
                          <InlineStack align="space-between">
                            <Text variant="headingMd" as="h4">
                              {field.type === 'billing'
                                ? 'Endereço de Faturamento'
                                : 'Endereço de Entrega'}
                            </Text>
                            {fields.length > 1 && (
                              <Button
                                onClick={() => removeAddress(index)}
                                icon={MinusIcon}
                                variant="plain"
                                tone="critical"
                              >
                                Remover
                              </Button>
                            )}
                          </InlineStack>

                          <FormLayout>
                            <Controller
                              name={`addresses.${index}.type`}
                              control={control}
                              render={({field}) => (
                                <ChoiceList
                                  title="Tipo de Endereço"
                                  choices={[
                                    {label: 'Faturamento', value: 'billing'},
                                    {label: 'Entrega', value: 'shipping'},
                                  ]}
                                  selected={[field.value]}
                                  onChange={([value]) => field.onChange(value)}
                                />
                              )}
                            />

                            <Controller
                              name={`addresses.${index}.street`}
                              control={control}
                              rules={{
                                required: 'Rua é obrigatória',
                              }}
                              render={({field}) => (
                                <TextField
                                  label="Rua"
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  error={
                                    errors.addresses?.[index]?.street?.message
                                  }
                                />
                              )}
                            />

                            <FormLayout.Group>
                              <Controller
                                name={`addresses.${index}.city`}
                                control={control}
                                rules={{
                                  required: 'Cidade é obrigatória',
                                }}
                                render={({field}) => (
                                  <TextField
                                    label="Cidade"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={
                                      errors.addresses?.[index]?.city?.message
                                    }
                                  />
                                )}
                              />

                              <Controller
                                name={`addresses.${index}.state`}
                                control={control}
                                rules={{
                                  required: 'Estado é obrigatório',
                                }}
                                render={({field}) => (
                                  <TextField
                                    label="Estado"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={
                                      errors.addresses?.[index]?.state?.message
                                    }
                                  />
                                )}
                              />
                            </FormLayout.Group>

                            <FormLayout.Group>
                              <Controller
                                name={`addresses.${index}.zipCode`}
                                control={control}
                                rules={{
                                  required: 'CEP é obrigatório',
                                  pattern: {
                                    value: /^\d{5}-?\d{3}$/,
                                    message:
                                      'CEP deve estar no formato 12345-678',
                                  },
                                }}
                                render={({field}) => (
                                  <TextField
                                    label="CEP"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    error={
                                      errors.addresses?.[index]?.zipCode
                                        ?.message
                                    }
                                    placeholder="12345-678"
                                  />
                                )}
                              />

                              <Controller
                                name={`addresses.${index}.country`}
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
                                    error={
                                      errors.addresses?.[index]?.country
                                        ?.message
                                    }
                                  />
                                )}
                              />
                            </FormLayout.Group>
                          </FormLayout>
                        </div>
                      </Card>
                    ))}

                    <Divider />

                    <Text variant="headingMd" as="h3">
                      Preferências
                    </Text>

                    <FormLayout>
                      <Controller
                        name="preferences.notifications"
                        control={control}
                        render={({field}) => (
                          <ChoiceList
                            title="Notificações"
                            allowMultiple
                            choices={[
                              {label: 'Email', value: 'email'},
                              {label: 'SMS', value: 'sms'},
                              {label: 'Push', value: 'push'},
                              {label: 'WhatsApp', value: 'whatsapp'},
                            ]}
                            selected={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />

                      <Controller
                        name="preferences.language"
                        control={control}
                        render={({field}) => (
                          <ChoiceList
                            title="Idioma"
                            choices={[
                              {label: 'Português', value: 'pt'},
                              {label: 'English', value: 'en'},
                              {label: 'Español', value: 'es'},
                            ]}
                            selected={[field.value]}
                            onChange={([value]) => field.onChange(value)}
                          />
                        )}
                      />

                      <Controller
                        name="preferences.timezone"
                        control={control}
                        render={({field}) => (
                          <Select
                            label="Fuso Horário"
                            options={timezones}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </FormLayout>

                    <Controller
                      name="terms"
                      control={control}
                      rules={{
                        required: 'Você deve aceitar os termos',
                      }}
                      render={({field}) => (
                        <Checkbox
                          label="Aceito os termos e condições de uso"
                          checked={field.value}
                          onChange={field.onChange}
                          error={errors.terms?.message}
                        />
                      )}
                    />

                    <InlineStack align="space-between">
                      <Button onClick={handleReset} variant="plain">
                        Limpar Formulário
                      </Button>
                      <Button submit loading={isSubmitting} disabled={!isValid}>
                        Enviar Dados
                      </Button>
                    </InlineStack>
                  </BlockStack>
                </form>

                {isSubmitSuccessful && (
                  <Banner
                    status="success"
                    title="Formulário enviado com sucesso!"
                  >
                    <p>Os dados da empresa foram processados corretamente.</p>
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
                    Veja os valores do formulário sendo atualizados:
                  </Text>
                  <div
                    style={{
                      backgroundColor: '#f6f6f7',
                      padding: '12px',
                      borderRadius: '4px',
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}
                  >
                    <pre style={{margin: 0, fontSize: '11px'}}>
                      {JSON.stringify(watchedValues, null, 2)}
                    </pre>
                  </div>
                </BlockStack>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
