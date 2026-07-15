import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getReportsRequest, updateReportStatusRequest } from "../../api/reportApi";
import { useToast } from "../../context/ToastContext";
import { extractFieldErrors, formatDateTime } from "../../utils/media";

import { PageHeader, Select } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";

import { IconFlag } from "../../components/icons";

const statusVariant = {
  pending: "amber",
  reviewed: "ink",
  resolved: "brand",
};

const statusLabel = {
  pending: "Pendiente",
  reviewed: "Revisado",
  resolved: "Resuelto",
};

export default function AdminReports() {
  const toast = useToast();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    loadReports();
  }, [statusFilter]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const response = await getReportsRequest(statusFilter || undefined);
      setReports(response.data.data);
    } catch (error) {
      toast.error("No se pudieron cargar los reportes.");
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (report, status) => {
    setActingId(report.id);
    try {
      await updateReportStatusRequest(report.id, status);
      toast.success("Estado del reporte actualizado.");
      loadReports();
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setActingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        eyebrow="Administracion"
        title="Reportes"
        description="Revisa reportes enviados por usuarios sobre negocios o resenas."
        actions={
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-44">
            <option value="">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="reviewed">Revisados</option>
            <option value="resolved">Resueltos</option>
          </Select>
        }
      />

      {reports.length === 0 ? (
        <EmptyState icon={<IconFlag className="h-6 w-6" />} title="No hay reportes" />
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="card-surface p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant={statusVariant[report.status] || "ink"}>
                      {statusLabel[report.status] || report.status}
                    </Badge>
                    <span className="text-xs text-ink-400">{formatDateTime(report.created_at)}</span>
                  </div>

                  <p className="text-sm text-ink-700">{report.reason}</p>

                  <p className="text-xs text-ink-400 mt-2">
                    Reportado por {report.reporter.first_name} {report.reporter.last_name} ({report.reporter.email})
                  </p>

                  {report.business && (
                    <Link
                      to={`/businesses/${report.business.slug}`}
                      className="text-xs font-medium text-brand-600 hover:text-brand-700 inline-block mt-1"
                    >
                      Ver negocio: {report.business.name}
                    </Link>
                  )}

                  {report.review && (
                    <p className="text-xs text-ink-400 mt-1">
                      Resena reportada: "{report.review.comment || "Sin comentario"}" ({report.review.rating}★)
                    </p>
                  )}
                </div>

                <Select
                  value={report.status}
                  disabled={actingId === report.id}
                  onChange={(e) => changeStatus(report, e.target.value)}
                  className="w-40 shrink-0"
                >
                  <option value="pending">Pendiente</option>
                  <option value="reviewed">Revisado</option>
                  <option value="resolved">Resuelto</option>
                </Select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
