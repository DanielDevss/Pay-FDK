import stripe from "../config/stripe.js";


/* -------------------------------------------------------------------------- */
/*                             Cuentas Conectadas                             */
/* -------------------------------------------------------------------------- */

// ✅ Crear cuenta de stripe Connect

export const createAccount = async ({ email }) => {
    try {
        return await stripe.accounts.create({
            country: 'MX',
            email: email,
            controller: {
                fees: {
                    payer: 'application',
                },
                losses: {
                    payments: 'application',
                },
                stripe_dashboard: {
                    type: 'none',
                },
                requirement_collection: 'application'
            },
            capabilities: {
                card_payments: {
                    requested: true,
                },
                transfers: {
                    requested: true,
                },
            },
            business_type: 'individual',
        });
    } catch (error) {
        throw new Error(`Error al crear cuenta de stripe: ${error.message}`);
    }
}

// ✅ Actualizar cuenta de stripe Connect

export const updateAccount = async(stripeAccountId, rfc, email, firstName, lastName, phone) => {
    try {
        return await stripe.accounts.update(stripeAccountId,{
            email: email,
            individual: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                id_number: rfc
            },
        })
    } catch (error) {
        throw new Error(`Error al actualizar cuenta de stripe: ${error.message}`)
    }
}

// ✅ Recopilar información de la cuenta del usuario

export const setUserDataStripeAccount = async ({ user, dob, address, stripeAccountId, ipAddress, business }) => {
    try {
        return await stripe.accounts.update(stripeAccountId, {
            // Aceptar terminos y condiciones
            tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: ipAddress
            },
            // Información del negocio
            business_profile: {
                mcc: business?.mcc || '7299',
                url: business.url,
            },
            // Información de la empresa
            individual: {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                phone: user.phone,
                dob: {
                    day: dob.day,
                    month: dob.month,
                    year: dob.year
                },
                id_number: user.rfc,
                address: {
                    line1: address.address,
                    city: address.city,
                    state: address.state,
                    postal_code: address.postalCode,
                    country: address.country,
                },
            },
        })
    } catch (error) {
        throw new Error(`Error al recopilar información de la cuenta de stripe: ${error.message}`);
    }
}

// ✅ Obtener información de cuenta Connect

export const getAccountConnect = async (stripeAccountId) => {
    try {
        return await stripe.accounts.retrieve(stripeAccountId)
    } catch (error) {
        throw new Error(`Error al recuperar la cuenta: ${error.message}`)
    }
}

/* -------------------------------------------------------------------------- */
/*                               External Banks                               */
/* -------------------------------------------------------------------------- */

// ✅ Agregar cuenta de banco

export const addBankAccount = async (stripeAccountId, bankAccount) => {
    try {
        return await stripe.accounts.createExternalAccount(
            stripeAccountId,
            {
                external_account: {
                    object: 'bank_account',
                    account_number: bankAccount.account_number,
                    country: 'MX',
                    currency: 'mxn',
                    // routing_number: bankAccount.routing_number, // No se necesita en Mexico
                    account_holder_name: bankAccount.holder_name,
                    account_holder_type: bankAccount.holder_type,
                },
            }
        );
    } catch (error) {
        throw new Error(`Error al agregar cuenta de banco: ${error.message}`);
    }
}

// ✅ Obtener información de cuenta Bancaria

export const getBankAccount = async (stripeBankAccountId, stripeAccountId) => {
    try {
        const bankData = await stripe.accounts.retrieveExternalAccount(stripeAccountId, stripeBankAccountId)
        return {
            bankName: bankData.bank_name,
            bankAccount: `**************${bankData.last4}`,
            bankStatus: bankData.status
        }
    } catch (error) {
        // throw new Error(`No haz ingresado ninguna cuneta de banco`)
        return null
    }
}
