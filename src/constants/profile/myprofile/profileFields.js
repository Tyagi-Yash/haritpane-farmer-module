export const profileFields = [
  {
    label: "account.fullName",
    required: true,
    type: "text",
    placeholder: "account.noNameYet",
    valueKey: "farmerName",
    disabled: true,
  },
  {
    label: "account.phoneNumber",
    required: true,
    type: "tel",
    placeholder: "account.noPhoneYet",
    valueKey: "phone",
    disabled: true,
  },
  {
    label: "account.emailAddress",
    required: false,
    type: "email",
    placeholder: "account.noEmailYet",
    valueKey: "email",
    disabled: true,
  },
  {
    label: "account.fullAddress",
    required: true,
    type: "text",
    placeholder: "account.noAddressYet",
    valueKey: "address",
    disabled: true,
  },
];