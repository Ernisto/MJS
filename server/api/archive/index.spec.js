'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var archiveCtrlStub = {
  index: 'archiveCtrl.index',
  show: 'archiveCtrl.show',
  create: 'archiveCtrl.create',
  upsert: 'archiveCtrl.upsert',
  patch: 'archiveCtrl.patch',
  destroy: 'archiveCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var archiveIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './archive.controller': archiveCtrlStub
});

describe('Archive API Router:', function() {
  it('should return an express router instance', function() {
    expect(archiveIndex).to.equal(routerStub);
  });

  describe('GET /api/archives', function() {
    it('should route to archive.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'archiveCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/archives/:id', function() {
    it('should route to archive.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'archiveCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/archives', function() {
    it('should route to archive.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'archiveCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/archives/:id', function() {
    it('should route to archive.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'archiveCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/archives/:id', function() {
    it('should route to archive.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'archiveCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/archives/:id', function() {
    it('should route to archive.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'archiveCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
