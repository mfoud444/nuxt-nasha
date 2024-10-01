<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY || null;

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);
const message = useMessage()
const isInvalidEmail = ref<boolean>(false);
const stripe = stripeKey ? await loadStripe(stripeKey) : null;
let elements = ref(null);
const isPaid = ref<boolean>(false);

// onBeforeMount(async () => {
//   if (query.cancel_order) window.close();
// });

const payNow = async () => {
  buttonText.value = t('messages.general.processing');



  try {
    const { stripePaymentIntent } = await GqlGetStripePaymentIntent();
    const { clientSecret } = stripePaymentIntent;
    if (orderInput.value.paymentMethod.id === 'stripe') {
      const cardElement = elements.value.getElement('card');
      const { setupIntent } = await stripe.confirmCardSetup(clientSecret, { payment_method: { card: cardElement } });
      const { source } = await stripe.createSource(cardElement);

      if (source) orderInput.value.metaData.push({ key: '_stripe_source_id', value: source.id });
      if (setupIntent) orderInput.value.metaData.push({ key: '_stripe_intent_id', value: setupIntent.id });

      isPaid.value = setupIntent?.status === 'succeeded' || false;
      orderInput.value.transactionId = source?.created?.toString() || new Date().getTime().toString();
    }
  } catch (error) {
    console.error(error);
    buttonText.value = t('messages.shop.placeOrder');
  }

  proccessCheckout(isPaid.value);
};

const handleStripeElement = (stripeElements) => {
  elements.value = stripeElements;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkEmailOnBlur = (email: string) => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email: string) => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
});


import type { StepsProps } from 'naive-ui'
const current = ref<number | null>(!viewer.value  ? 1 : 2);
const currentStatus = ref<StepsProps['status']>('process')
function validateStep(): boolean {
  if (current.value === 1) {
    // Validate email for Step 1
    if (!customer.value.billing.email || isInvalidEmail.value) {
      message.error(t('messages.error.invalidEmail'))
  
      return false;
    }
  }
  if (current.value === 2) {
    // Validate billing details for Step 2
    if (!customer.value.billing?.firstName || !customer.value.billing.lastName || !customer.value.billing.address1 || !customer.value.billing.city || !customer.value.billing.postcode || !customer.value.billing.country) {
      message.error(t('messages.error.missingBillingDetails'));
      return false;
    }
    if (orderInput.shipToDifferentAddress && (!customer.value.shipping.firstName || !customer.value.shipping.lastName || !customer.value.shipping.address1 || !customer.value.shipping.city || !customer.value.shipping.postcode || !customer.value.shipping.country)) {
      message.error(t('messages.error.missingShippingDetails'));
      return false;
    }
  }
  if (current.value === 3) {
    // Validate payment method for Step 3
    if (!orderInput.value.paymentMethod || !orderInput.value.paymentMethod.id) {
      message.error(t('messages.error.missingPaymentMethod'));
      return false;
    }
  }
  return true;
}

function next() {
  if (!validateStep()) return;
  if (current.value === null)
    current.value = 1
  else if (current.value >= 4)
    current.value = null
  else current.value++
}
function prev() {
  if (current.value === 0)
    current.value = null
  else if (current.value === null)
    current.value = 4
  else current.value--
}

</script>
<template>
  <div class="flex flex-col h-full">
    <LoadingIcon
      v-if="!cart"
      class="m-auto"
    />
    <template v-else>
      <div
        v-if="cart.isEmpty"
        class="flex flex-col  items-center justify-center flex-1 mb-12"
      >
        <Icon
          name="ion:cart-outline"
          size="156"
          class="opacity-25 mb-5"
        />
        <h2 class="text-2xl font-bold mb-2">{{ $t('messages.shop.cartEmpty') }}</h2>
        <span class="text-gray-400 mb-4">{{ $t('messages.shop.addProductsInYourCart') }}</span>
        <NuxtLink
          to="/products"
          class="flex items-center justify-center gap-3 p-2 px-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark"
        >
          {{ $t('messages.shop.browseOurProducts') }}
        </NuxtLink>
      </div>

      <template v-else>
  
     
        <form
          class=" mx-4  flex-1 flex flex-col h-full relative"
          @submit.prevent="payNow"
        >
        <div
            class=" sticky top-0 myglass flex items-center justify-center py-2"
        >
          <n-steps
        class="ml-8"
            :current="current as number"
           
            :status="currentStatus"
          >
          <n-step>
                <template #icon>
                  <SvgIcon icon="ion:home" class="text-white" />
                </template>
              </n-step>
              <n-step>
                <template #icon>
                  <SvgIcon icon="ion:person"  />
                </template>
              </n-step>
              <n-step>
                <template #icon>
                  <SvgIcon icon="ion:card" />
                </template>
              </n-step>
              <n-step>
                <template #icon>
                  <SvgIcon icon="ion:checkmark-circle"  />
                </template>
              </n-step>
            </n-steps>
        </div>
          <div class="grid w-full my-2 max-w-2xl gap-8 checkout-form flex-1">
            <div v-if="!viewer && current == 1">
              <h2 class="w-full my-2 text-2xl font-semibold leading-none">{{ $t('messages.account.emailOrUsername') }}</h2>
              <p class="mt-1 text-sm text-gray-500">{{ $t('messages.account.hasAccount') }} <a
                  href="/my-account"
                  class="text-primary text-semibold"
                >{{ $t('messages.account.login') }}</a>.</p>
              <div class="w-full mt-4">
                <label for="email">{{ $t('messages.billing.email') }}</label>
                <input
                  v-model="customer.billing.email"
                  placeholder="johndoe@email.com"
                  type="email"
                  name="email"
                  :class="{ 'has-error': isInvalidEmail }"
                  @blur="checkEmailOnBlur(customer.billing.email)"
                  @input="checkEmailOnInput(customer.billing.email)"
                  required
                />
                <Transition
                  name="scale-y"
                  mode="out-in"
                >
                  <div
                    v-if="isInvalidEmail"
                    class="mt-1 text-sm text-red-500"
                  >{{ $t('messages.error.general') }}</div>
                </Transition>
              </div>
              <template v-if="orderInput.createAccount">
                <div class="w-full mt-4">
                  <label for="username">{{ $t('messages.account.username') }}</label>
                  <input
                    v-model="orderInput.username"
                    placeholder="Username"
                    type="text"
                    name="username"
                    required
                  />
                </div>
                <div
                  class="w-full my-2"
                  v-if="orderInput.createAccount"
                >
                  <label for="email">{{ $t('messages.account.password') }}</label>
                  <PasswordInput
                    id="password"
                    class="my-2"
                    v-model="orderInput.password"
                    placeholder="Password"
                    :required="true"
                  />
                </div>
              </template>
              <div
                v-if="!viewer"
                class="flex items-center gap-2 my-2"
              >
                <label for="creat-account">{{ $t('messages.account.register') }}</label>
                <input
                  id="creat-account"
                  v-model="orderInput.createAccount"
                  type="checkbox"
                  name="creat-account"
                />
              </div>
            </div>

            <template v-if="current == 2">
              <div>
                <h2 class="w-full mb-3 text-2xl font-semibold">{{ $t('messages.billing.billingDetails') }}</h2>
             


                <!-- <div  class="grid w-full gap-4 lg:grid-cols-2">
    <div class="w-full">
      <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
      <input v-model="customer.billing.firstName" placeholder="John" type="text" required />
    </div>

    <div class="w-full">
      <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
      <input v-model="customer.billing.lastName" placeholder="Doe" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <label for="address1">{{ $t('messages.billing.address1') }}</label>
      <input v-model="customer.billing.address1" placeholder="O'Connell Street" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <label for="address2">{{ $t('messages.billing.address2') }}</label>
      <input v-model="customer.billing.address2" placeholder="Dublin 1" type="text" />
    </div>

    <div class="w-full">
      <label for="city">{{ $t('messages.billing.city') }}</label>
      <input v-model="customer.billing.city" placeholder="Dublin" type="text" required />
    </div>

    <div class="w-full">
      <label for="state">{{ $t('messages.billing.state') }}</label>
      <StateSelect v-model="customer.billing.state" :default-value="billing.state" :country-code="billing.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <label for="country">{{ $t('messages.billing.country') }}</label>
      <CountrySelect v-model="customer.billing.country" :default-value="billing.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <label for="zip">ZIP ({{ $t('messages.general.optional') }})</label>
      <input v-model="customer.billing.postcode" placeholder="D01 1234" type="text" />
    </div>

    <div class="w-full col-span-full">
      <label for="phone">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label>
      <input v-model="customer.billing.phone" placeholder="+353871234567" type="tel" />
    </div>
  </div> -->
                <BillingDetails
                  v-model="customer.billing"
                  :sameAsShippingAddress="orderInput.shipToDifferentAddress"
                />
              </div>

              <label v-if="cart.availableShippingMethods.length > 0" for="shipToDifferentAddress" class="flex items-center gap-2">
            <span>{{ $t('messages.billing.differentAddress') }}</span>
            <input id="shipToDifferentAddress" v-model="orderInput.shipToDifferentAddress" type="checkbox" name="shipToDifferentAddress" />
          </label>
              <!-- <label
                for="shipToDifferentAddress"
                class="flex items-center gap-2"
              >
                <span>{{ $t('messages.billing.differentAddress') }}</span>
                <input
                  id="shipToDifferentAddress"
                  v-model="orderInput.shipToDifferentAddress"
                  type="checkbox"
                  name="shipToDifferentAddress"
                />
              </label> -->

              <Transition
                name="scale-y"
                mode="out-in"
              >
                <div v-show="orderInput.shipToDifferentAddress">
                  <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingDetails') }}</h2>
                  <ShippingDetails v-model="customer.shipping" />
                </div>
              </Transition>

              <div v-if="cart.availableShippingMethods.length">
                <h3 class="mb-4 text-xl font-semibold">{{ $t('messages.general.shippingSelect') }}</h3>
                <ShippingOptions
                  :options="cart.availableShippingMethods[0].rates"
                  :active-option="cart.chosenShippingMethods[0]"
                />
              </div>
            </template>

            <template v-if="current == 3">
              <div
                v-if="paymentGateways.nodes.length"
                class="mt-2 col-span-full"
              >
                <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.billing.paymentOptions') }}</h2>
                <PaymentOptions
                  v-model="orderInput.paymentMethod"
                  class="mb-4"
                  :paymentGateways="paymentGateways"
                />
                <StripeElement
                  v-if="stripe"
                  v-show="orderInput.paymentMethod.id == 'stripe'"
                  :stripe="stripe"
                  @updateElement="handleStripeElement"
                />
              </div>
            </template>

            <template v-if="current == 4">
              <div>
                <h2 class="mb-4 text-xl font-semibold">{{ $t('messages.shop.orderNote') }} ({{ $t('messages.general.optional') }})</h2>
                <textarea
                  id="order-note"
                  v-model="orderInput.customerNote"
                  name="order-note"
                  class="w-full"
                  rows="4"
                  :placeholder="$t('messages.shop.orderNotePlaceholder')"
                ></textarea>
              </div>

              <OrderSummary>
                <button
                  class="flex items-center justify-center w-full gap-3 p-3 mt-4 font-semibold text-center text-white rounded-lg shadow-md bg-primary hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-400"
                  :disabled="isCheckoutDisabled"
                >
                  {{ buttonText }}
                  <LoadingIcon
                    v-if="isProcessingOrder"
                    color="#fff"
                    size="18"
                  />
                </button>
              </OrderSummary>
            </template>
          </div>

          <div class="sticky bottom-0">
              <n-button-group class="text-start bg-blue-100">
                <n-button @click="prev" class="rounded-full" :disabled="current ===1 ? true : false">
                  <template #icon>
                    <SvgIcon icon="ion:arrow-back" />
                  </template>
                </n-button>
                <n-button @click="next" :disabled="current ===4 ? true : false">
                  <template #icon>
                    <SvgIcon icon="ion:arrow-forward" />
                  </template>
                </n-button>
              </n-button-group>
            </div>


        </form>
      </template>
    </template>
  </div>
</template>

<style lang="postcss">
.checkout-form input[type='text'],
.checkout-form input[type='email'],
.checkout-form input[type='tel'],
.checkout-form input[type='password'],
.checkout-form textarea,
.checkout-form select,
.checkout-form .StripeElement {
  @apply bg-white border rounded-md outline-none border-gray-300 shadow-sm w-full py-2 px-4;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form label {
  @apply my-1.5 text-xs text-gray-600 uppercase;
}

.checkout-form .StripeElement {
  padding: 1rem 0.75rem;
}
</style>
