import React from 'react';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

export default function ExportExcelButton({ data, fileName = 'export', columns = [] }) {
    const handleExport = () => {
        if (!data || data.length === 0) {
            alert("İndirilecek veri bulunamadı.");
            return;
        }

        let exportData = data;

        // Eğer özelleştirilmiş başlıklar veya anahtarlar istenirse
        if (columns && columns.length > 0) {
            exportData = data.map(item => {
                const row = {};
                columns.forEach(col => {
                    if (typeof col === 'object') {
                        row[col.label] = item[col.key];
                    } else {
                        row[col] = item[col];
                    }
                });
                return row;
            });
        }

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Sütun genişliklerini ayarla (opsiyonel)
        if (exportData.length > 0) {
            const keys = Object.keys(exportData[0]);
            const colWidths = keys.map(key => ({
                wch: Math.max(
                    key.length,
                    ...exportData.map(row => row[key] ? String(row[key]).length : 0)
                ) + 2
            }));
            worksheet['!cols'] = colWidths;
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Veri");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    return (
        <button
            onClick={handleExport}
            className="btn btn-sm btn-outline shadow-sm bg-base-100 flex items-center gap-1.5 shrink-0 hover:bg-success hover:text-success-content hover:border-success transition-colors"
            title="Excel formatında indir"
        >
            <Download size={14} />
            <span className="hidden sm:inline text-xs font-semibold">Excel İndir</span>
        </button>
    );
}
