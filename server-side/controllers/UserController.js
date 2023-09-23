const { User } = require("../models");
const XLSX = require("xlsx");
const fs = require("fs");

module.exports = class UserController {
  static async getUser(req, res, next) {
    try {
      const { params: { id } } = req;

      if (id) {
        const user = await User.findByPk(id);

        if (!user) {
          throw { name: "NotFound", msg: "User Not Found" };
        }

        res.json(user);
      } else {
        const users = await User.findAll();

        res.json(users);
      }
    } catch (error) {
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { body: { name, gender, email, phone, address } } = req;

      const user = await User.create({ name, gender, email, phone, address });

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { body: { name, gender, email, phone, address }, params: { id } } = req;

      const [rowAffected] = await User.update({
        name,
        gender,
        email,
        phone,
        address
      }, {
        where: { id },
        returning: true
      });

      if (!rowAffected) {
        throw { name: "NotFound", msg: "User Not Found" };
      }

      res.json({ msg: `user with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { params: { id } } = req;

      const rowAffected = await User.destroy({ where: { id } });

      if (!rowAffected) {
        throw { name: "NotFound", msg: "User Not Found" };
      }

      res.json({ msg: `user with id ${id} deleted` });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async exportExcel(req, res, next) {
    try {
      const users = await User.findAll();

      const temp = [];

      temp.push(["#", "Name", "Gender", "Email", "Phone", "Address"]);

      users.forEach((user, i) => {
        temp.push([i + 1, user.name, user.gender, user.email, user.phone, user.address]);
      })

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(temp);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      // Save the Excel file temporarily on the server
      fs.writeFileSync('temp.xlsx', buffer);

      // Send the Excel file as a response
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=example.xlsx'
      );
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      const fileStream = fs.createReadStream('temp.xlsx');
      fileStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  // static async exportExcel(req, res, next) {
  //   try {
  //     /* fetch JSON data and parse */
  //     const url = "https://sheetjs.com/data/executive.json";
  //     const raw_data = await (await fetch(url)).json();

  //     /* filter for the Presidents */
  //     const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

  //     /* sort by first presidential term */
  //     prez.forEach(row => row.start = row.terms.find(term => term.type === "prez").start);
  //     prez.sort((l, r) => l.start.localeCompare(r.start));

  //     /* flatten objects */
  //     const rows = prez.map(row => ({
  //       name: row.name.first + " " + row.name.last,
  //       birthday: row.bio.birthday
  //     }));

  //     /* generate worksheet and workbook */
  //     const worksheet = XLSX.utils.json_to_sheet(rows);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  //     /* fix headers */
  //     XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  //     /* calculate column width */
  //     const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
  //     worksheet["!cols"] = [{ wch: max_width }];

  //     /* create an XLSX file and try to save to Presidents.xlsx */
  //     // XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });

  //     const excelBuffer = XLSX.write(workbook, {
  //       type: 'buffer',
  //       bookType: 'csv',
  //     });

  //     res.set({
  //       'Content-Type':
  //         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       'Content-Disposition': 'attachment; filename=report.xlsx',
  //       'Content-Length': excelBuffer.length,
  //     })

  //     console.log(excelBuffer);
  //     res.send(excelBuffer);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}