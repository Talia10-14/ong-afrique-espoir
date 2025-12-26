import { getActions } from "@/app/actions/actions";
import { ActionForm } from "@/components/admin/ActionForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default async function AdminDashboard() {
  const actions = await getActions();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-terra-dark">Tableau de Bord Admin</h1>
          <div className="text-sm text-gray-500">
            Connecté en tant qu&apos;Administrateur
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <ActionForm actions={actions} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
