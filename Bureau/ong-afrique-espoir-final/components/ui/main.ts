interface KkiapayWidgetOptions {
  amount: string;
  position: string;
  callback: string;
  data: string;
  theme: string;
  sandbox: string;
  key: string;
}

interface WindowWithKkiapay extends Window {
  openKkiapayWidget?: (options: KkiapayWidgetOptions) => void;
}

export const openPaymentWidget = (amount: string, formData: unknown) => {
  if (typeof window !== 'undefined' && (window as WindowWithKkiapay).openKkiapayWidget) {
    (window as WindowWithKkiapay).openKkiapayWidget!({
      amount: amount,
      position: "center",
      callback: window.location.origin + "/merci",
      data: JSON.stringify(formData),
      theme: "#2E7D32",
      sandbox: "",
      key: "1edc0b3a84f52bd852eed86db2d5be4775fa7930"
    });
  } else {
    console.error("KKiaPay widget not loaded");
    alert("Le système de paiement n'est pas encore chargé. Veuillez réessayer dans quelques secondes.");
  }
};
