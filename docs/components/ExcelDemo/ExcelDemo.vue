<script setup>
import { ref } from 'vue';
import ExcelJS from 'exceljs';

const fileInput = ref();

const handleChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.load(data).then(async (workbook) => {
      const worksheet = workbook.getWorksheet(1);
      const lastColNumber = worksheet.columnCount;
      const preCol = worksheet.getColumn(lastColNumber);
      const newCol = worksheet.getColumn(lastColNumber + 1);
      newCol.values = [null, '地址'];
      newCol.width = preCol.width;
      newCol.style = preCol.style;
      worksheet.dataValidations.add(
        `${newCol.letter}3:${newCol.letter}999999`,
        {
          type: 'list',
          allowBlank: true,
          formulae: ['"青岛市,杭州市,上海市"'],
          showErrorMessage: true,
        }
      );

      // 给单元格添加样式
      const row = worksheet.getRow(2);
      const newCell = row.getCell(lastColNumber + 1);
      const preCell = row.getCell(lastColNumber);
      newCell.style = preCell.style;

      // 合并列头
      worksheet.unMergeCells('A1');
      worksheet.mergeCells(`A1:${newCol.letter}1`);

      // 生成文件
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'newTemplate.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  reader.readAsArrayBuffer(file);
};
</script>

<template>
  <p>
    <a
      href="../../public/excel/template.xlsx"
      target="_blank"
      download="template.xlsx"
      >下载模板</a
    >
  </p>
  <input type="file" ref="fileInput" @change="handleChange" />
</template>

<style lang="scss"></style>
