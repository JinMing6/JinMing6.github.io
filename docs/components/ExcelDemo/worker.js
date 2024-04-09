import ExcelJS from 'exceljs';

onmessage = function (e) {
  getExcelUrl(e.data);
};

function getExcelUrl(result) {
  const data = new Uint8Array(result);
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.load(data).then(async (workbook) => {
    const worksheet = workbook.getWorksheet(1);
    const lastColNumber = worksheet.columnCount;
    const preCol = worksheet.getColumn(lastColNumber);
    const newCol = worksheet.getColumn(lastColNumber + 1);
    newCol.values = [null, '地址'];
    newCol.width = preCol.width;
    newCol.style = preCol.style;
    worksheet.dataValidations.add(`${newCol.letter}3:${newCol.letter}999999`, {
      type: 'list',
      allowBlank: true,
      formulae: ['"青岛市,杭州市,上海市"'],
      showErrorMessage: true,
    });

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
    postMessage(blob);
  });
}
