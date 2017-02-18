/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Journal from '../api/journal/journal.model';
import JournalProperty from '../api/journal-property/journal-property.model';
import Archive from '../api/archive/archive.model';
import Log from '../api/log/log.model';

Log.find({}).remove().then(function () {
  User.find({}).remove()
    .then(() => {
      User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
        .then(() => {
          console.log('finished populating users');
        });
    });
});

Journal.find({}).remove()
  .then(() => {
    var journals = require('./fixtures/journals');
    Journal.create(journals)
      .then((populatedJournals) => {
        console.log('finished populating journals');

        JournalProperty.find({}).remove()
          .then(function () {
            var properties = require('./fixtures/journal-properties')(populatedJournals);
            JournalProperty.create(properties)
              .then((populatedProperties) => {
                console.log('finished populating journal properties');

                for (let journal in populatedJournals) {
                  for (let prop in populatedProperties) {
                    if (populatedJournals[journal]._id == populatedProperties[prop].journal) {
                      populatedJournals[journal]['journal-properties'].push(populatedProperties[prop]._id);
                    }
                  }
                  populatedJournals[journal].save();
                }

                Archive.find({}).remove()
                  .then(() => {
                    var archives = require('./fixtures/mjen-archives')(populatedJournals);
                    Archive.create(archives)
                      .then(function (populatedArchives) {
                        console.log('finished populating archives');

                        for (let journal in populatedJournals) {
                          for (let archive in populatedArchives) {
                            if (populatedJournals[journal]._id == populatedArchives[archive].journal) {
                              populatedJournals[journal].archives.push(populatedArchives[archive]._id);
                            }
                          }
                          populatedJournals[journal].save();
                        }
                      });
                  });
              })
          });
      });
  });


// Archive.find({}).remove()
//   .then(() => {
//     Archive.create({
//       'journal': 'mjen',
//       'title': 'Кыргызстандын билим берүү мекемелери үчүн бирдиктүү портал шаблонун иштеп чыгуу',
//       'authors': "Чынара Байжанова, Улан Бримкулов",
//       'year': new Date(),
//       'abstract': "Маалымат Байланыш Технологияларын (МБТ) жана ачык тармактык ресурстарды колдонуу менен билим берүүнүн өнүгүү темпи жана келечеги өзгөрүүдө. Мектептин веб системи билим берүү мекемесинин башкаруу, ички жана сырткы персонал жана окуучулар арасындагы байланышуу жолдорун жеңилдетет. Ошондуктан Кыргызстандын билим берүү мекемелери үчүн типтүү сайттын шаблонун иштеп чыгуу маселеси эң маанилүү. Макалада маалымат системи, билим берүүнүн маалыматташуусу жана XXI кылымдын окуучусунун талаптары жөнүндө аныктамалар келтирилген. Изилдөө методунун негизинде Кыргызстандагы жана чет өлкөдөгү 100дөн ашуун билим берүү мекемелеринин веб сайттары техникалык жана маалыматтык камсыздоочу аспектинен анализденген. Жыйынтык катары мектеп сайтынын бирдиктүү түзүмү жана шаблону сунушталат.",
//       'keywords': ["Мектеп маалымат системи (ММС)", "билим берүүнүн маалыматташуусу", "мектеп веб сайт түзүмү", "веб портал", "бирдиктүү шаблон"],
//       'references': [
//         "Бримкулов У.Н. Маалымат теориясына киришүү. Б.: Айат, (2011) 160.",
//         "Дөөлөталиева А.С., Калыбеков А. Окутуу процессин маалыматташ–тыруу мезгилдин талабы Ж. Баласагын ат. КУУ Жарчысы, Серия – 6 (Спец. выпуск), Бишкек. (6-ноябрь, 2009) 120-122.",
//         "Georgette Grier-Key, M.A., Mary T. Kelly, Ed.D, Elsa-Sofia Morote, Ed.D, K-12 School",
//         "Principals and Assistant Principals Information Management, Knowledge of Technology and Level of Education, E-learn 2011, Honolulu, Hawaii, (October 18-21, 2011) 2-3.",
//         "Robertson, J. 10 prensiples of effective information management. Step two designs, (2005) 2-7.",
//         "Pegler, G. Perspectives for school information systems. Australian Journal of Educational Technology, (1992) 8(2), 161-171.",
//         "Demir, K. School management information systems in primary schools. The Turkish Online Journal of Educational Technology, (2006) 5(2), Article 6.",
//         "Кыргыз Республикасынын Президентинин буйругу, (25 – июнь, 1997).",
//         "Королева Е., Атанасов Г. Рейтинг школьных сайтов, Январь 2013. Интернет дареги: http://rating.rosnou.ru/. Кайрылуу датасы: 20 Март 2013.",
//         "Бримкулов, У.Н., Жумабаева Ч.Н. Веб сайт как основа Информационной Системы  Управления Школой (на примере Кыргызстана). Современные проблемы науки образования. №6, (2012)",
//         "Захарова И.Г. Информационные технологии в образовании, Москва: Академия, (2003). 180-181"
//       ],
//       'file': "mjen/archives/Y2013_V2_I14/b006849fe844aec036ca2e682240199b.pdf"
//     })
//       .then(() => {
//         console.log('finished populating archives');
//       })
//   });

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1',
//   database: 'fendergi'
// });
//
// connection.connect();
//
// var result = [];
//
// var accumulateData = function (archives, index) {
//   if (index < archives.length) {
//     connection.query("SELECT * FROM articles where code = '" + archives[index].article + "'", function (err, rows, fields) {
//       if (err) throw err;
//
//
//       // for (var archive in rows) {
//       //   console.log(rows[archive]);
//       result.push({
//           "journal": "mjen",
//           "title": rows[0].name,
//           "authors": "",
//           "date": archives[index].date,
//           "abstract": rows[0].abstract,
//           "keywords": [rows[0].keyword],
//           "references": [archives[index].reference],
//           "file": "mjen/" + archives[index].url
//         });
//       accumulateData(archives, index + 1);
//       // }
//     });
//   } else {
//     Archive.find({}).remove()
//       .then(() => {
//         console.log(JSON.stringify(result));
//         Archive.create(result);
//       });
//   }
// };
//
// connection.query('SELECT * FROM archive_articles', function (err, rows, fields) {
//   if (err) throw err;
//   accumulateData(rows, 0);
//
//   // for (var archive in rows) {
//   //   console.log(rows[archive]);
//   //   archives.push({
//   //     'journal': 'mjen',
//   //     'title': rows[archive].name,
//   //     'authors': "",
//   //     'year': rows[archive].datetime,
//   //     'abstract': rows[archive].abstract,
//   //     'keywords': [rows[archive].keyword],
//   //     'references': rows[archive].reference,
//   //     'file': rows[archive].file
//   //   });
//   // }
// });
