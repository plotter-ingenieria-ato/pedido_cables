import Layout from "@/components/Layout";
import EditarUsuarioForm from "@/components/usuarios/EditarUsuarioForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarUsuarioPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            Editar Usuario
          </h1>

          <p className="text-gray-600">
            Gestión y actualización de la información del usuario.
          </p>
        </div>

        <EditarUsuarioForm id={id} />

      </div>
    </Layout>
  );
}