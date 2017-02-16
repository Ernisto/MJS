'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var journalPropertyCtrlStub = {
  index: 'journalPropertyCtrl.index',
  show: 'journalPropertyCtrl.show',
  create: 'journalPropertyCtrl.create',
  upsert: 'journalPropertyCtrl.upsert',
  patch: 'journalPropertyCtrl.patch',
  destroy: 'journalPropertyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var journalPropertyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './journal-property.controller': journalPropertyCtrlStub
});

describe('JournalProperty API Router:', function() {
  it('should return an express router instance', function() {
    expect(journalPropertyIndex).to.equal(routerStub);
  });

  describe('GET /api/journal-properties', function() {
    it('should route to journalProperty.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'journalPropertyCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/journal-properties/:id', function() {
    it('should route to journalProperty.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'journalPropertyCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/journal-properties', function() {
    it('should route to journalProperty.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'journalPropertyCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/journal-properties/:id', function() {
    it('should route to journalProperty.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'journalPropertyCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/journal-properties/:id', function() {
    it('should route to journalProperty.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'journalPropertyCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/journal-properties/:id', function() {
    it('should route to journalProperty.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'journalPropertyCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
