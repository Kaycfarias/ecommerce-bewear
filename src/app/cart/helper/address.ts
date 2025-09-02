interface ShippingAddress {
  number: string;
  email: string;
  phone: string;
  zipCode: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  recipientName: string;
  street: string;
  country: string;
  cpfOrCnpj: string;
}

export const formatAddress = (address: ShippingAddress) => {
  return `
  ${address.street}, ${address.number}
  ${address.complement && `, ${address.complement}`} - ${address.neighborhood}, 
  ${address.city}/${address.state} - CEP: ${address.zipCode} - ${address.phone}`;
};
