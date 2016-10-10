'use strict';

var app = require('../..');
import request from 'supertest';

var newArchive;

describe('Archive API:', function() {
  describe('GET /api/archives', function() {
    var archives;

    beforeEach(function(done) {
      request(app)
        .get('/api/archives')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          archives = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(archives).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/archives', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/archives')
        .send({
          name: 'New Archive',
          info: 'This is the brand new archive!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newArchive = res.body;
          done();
        });
    });

    it('should respond with the newly created archive', function() {
      expect(newArchive.name).to.equal('New Archive');
      expect(newArchive.info).to.equal('This is the brand new archive!!!');
    });
  });

  describe('GET /api/archives/:id', function() {
    var archive;

    beforeEach(function(done) {
      request(app)
        .get(`/api/archives/${newArchive._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          archive = res.body;
          done();
        });
    });

    afterEach(function() {
      archive = {};
    });

    it('should respond with the requested archive', function() {
      expect(archive.name).to.equal('New Archive');
      expect(archive.info).to.equal('This is the brand new archive!!!');
    });
  });

  describe('PUT /api/archives/:id', function() {
    var updatedArchive;

    beforeEach(function(done) {
      request(app)
        .put(`/api/archives/${newArchive._id}`)
        .send({
          name: 'Updated Archive',
          info: 'This is the updated archive!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedArchive = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedArchive = {};
    });

    it('should respond with the original archive', function() {
      expect(updatedArchive.name).to.equal('New Archive');
      expect(updatedArchive.info).to.equal('This is the brand new archive!!!');
    });

    it('should respond with the updated archive on a subsequent GET', function(done) {
      request(app)
        .get(`/api/archives/${newArchive._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let archive = res.body;

          expect(archive.name).to.equal('Updated Archive');
          expect(archive.info).to.equal('This is the updated archive!!!');

          done();
        });
    });
  });

  describe('PATCH /api/archives/:id', function() {
    var patchedArchive;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/archives/${newArchive._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Archive' },
          { op: 'replace', path: '/info', value: 'This is the patched archive!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedArchive = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedArchive = {};
    });

    it('should respond with the patched archive', function() {
      expect(patchedArchive.name).to.equal('Patched Archive');
      expect(patchedArchive.info).to.equal('This is the patched archive!!!');
    });
  });

  describe('DELETE /api/archives/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/archives/${newArchive._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when archive does not exist', function(done) {
      request(app)
        .delete(`/api/archives/${newArchive._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
