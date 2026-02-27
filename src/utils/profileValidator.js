export const isProfileComplete = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    console(storedUser);

    if (!storedUser) return false;

    const { name, phone, address } = storedUser;

    const isNameValid = typeof name === "string" && name.trim().length > 0;
    const isPhoneValid = typeof phone === "string" && phone.trim().length === 10;
    const isAddressValid = typeof address === "string" && address.trim().length > 0;

    return isNameValid && isPhoneValid && isAddressValid;
  } catch (error) {
    return false;
  }
};
