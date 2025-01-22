const cleanPhoneNumber = (phone: string): string => {
  let cleanedPhone = phone.replaceAll(/[^0-9]/g, '');
  if (cleanedPhone.startsWith('1')) {
    cleanedPhone = cleanedPhone.substring(1);
  }

  return cleanedPhone;
};

export {
  cleanPhoneNumber,
};
