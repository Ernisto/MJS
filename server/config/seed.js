/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict'; 
import User from '../api/user/user.model';
import Journal from '../api/journal/journal.model';

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

Journal.find({}).remove()
  .then(() => {
    Journal.create({
      title: 'Manas Journal of Engineering',
      abbreviation: 'MJEN'
    }, {
      title: 'Manas Journal of Social Studies',
      abbreviation: 'MJSS'
    }, {
      title: 'Manas Journal of Agriculture and Life Sciences',
      abbreviation: 'MJAL'
    }, {
      title: 'MANAS Journal of Economics and Administrative Science',
      abbreviation: 'REFORMA'
    })
      .then(() => {
        console.log('finished populating journals');
      })
  });
