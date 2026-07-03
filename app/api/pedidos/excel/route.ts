import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { obtenerPedidos } from "@/repositories/pedidos/pedido.repository";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const periodo = searchParams.get("periodo") ?? "todos";
    const estado = searchParams.get("estado") ?? "";
    const buscar = searchParams.get("buscar") ?? "";

    let pedidos = await obtenerPedidos(periodo);

    // Filtro por documento
    if (buscar.trim() !== "") {
      pedidos = pedidos.filter((pedido: any) =>
        pedido.numero_documento
          .toLowerCase()
          .includes(buscar.toLowerCase())
      );
    }

    // Filtro por estado
    if (estado !== "") {
      pedidos = pedidos.filter(
        (pedido: any) => pedido.estado === estado
      );
    }

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Sistema de Pedidos";
    workbook.company = "Mi Empresa";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Pedidos");

    // Título
    sheet.mergeCells("A1:G1");

    const titulo = sheet.getCell("A1");

    titulo.value = "REPORTE DE PEDIDOS";

    titulo.font = {
      bold: true,
      size: 18,
      color: {
        argb: "FFFFFFFF",
      },
    };

    titulo.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    titulo.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "1E40AF",
      },
    };

    sheet.addRow([]);

    // Encabezados
    const encabezados = sheet.addRow([
      "Documento",
      "SAP ID",
      "Solicitante",
      "Fecha Pedido",
      "Fecha Entregado",
      "Estado",
      "Observaciones",
    ]);

    encabezados.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: {
          argb: "FFFFFFFF",
        },
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "2563EB",
        },
      };

      cell.alignment = {
        horizontal: "center",
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
      };
    });

    pedidos.forEach((pedido: any) => {
      sheet.addRow([
        pedido.numero_documento,
        pedido.usuarios?.sap_id ?? "",
        pedido.usuarios?.nombre ?? "",
        pedido.fecha_pedido
          ? new Date(pedido.fecha_pedido).toLocaleString("es-SV")
          : "",
        pedido.fecha_entregado
          ? new Date(pedido.fecha_entregado).toLocaleString("es-SV")
          : "",
        pedido.estado,
        pedido.observaciones ?? "",
      ]);
    });

    // Ajustar ancho de columnas
    sheet.columns.forEach((column) => {
      let max = 20;

      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const len = cell.value
          ? cell.value.toString().length
          : 10;

        if (len > max) max = len;
      });

      column.width = max + 4;
    });

    // Congelar encabezado
    sheet.views = [
      {
        state: "frozen",
        ySplit: 3,
      },
    ];

    // AutoFiltro
    sheet.autoFilter = {
      from: "A3",
      to: "G3",
    };

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=Pedidos_${new Date()
          .toISOString()
          .slice(0, 10)}.xlsx`,
      },
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}