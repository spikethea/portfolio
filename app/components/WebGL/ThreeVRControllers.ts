const buildController = ( data ) => {

  switch ( data.targetRayMode ) {

    case 'tracked-pointer':

      const bufferGeometry = new THREE.BufferGeometry();
      bufferGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
      bufferGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );

      var material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );

      return new THREE.Line( bufferGeometry, material );

    case 'gaze':

      const geometry = new THREE.RingBufferGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
      const basicMaterial = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
      return new THREE.Mesh( geometry, basicMaterial );
  }
}

class ThreeVRControllers {

  constructor (renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.initialize();
  }

  initialize () {

    this.controller1 = this.renderer.xr.getController( 0 );
    this.controller1.addEventListener( 'selectstart', onSelectStart );
    this.controller1.addEventListener( 'selectend', onSelectEnd );
    this.controller1.addEventListener( 'connected', function ( event: any ) {
      this.add( buildController( event.data ) );
    });

    this.controller1.addEventListener( 'disconnected', function () {
      this.remove( this.children[ 0 ] );
    });

    this.scene.add( this.controller1 );

    this.controller2 = this.renderer.xr.getController( 1 );
    this.controller2.addEventListener( 'selectstart', onSelectStart );
    this.controller2.addEventListener( 'selectend', onSelectEnd );
    this.controller2.addEventListener( 'connected', function ( event: any ) {
      this.add( buildController( event.data ) );
    });
    this.controller2.addEventListener( 'disconnected', function () {
      this.remove( this.children[ 0 ] );
    });

    this.scene.add( this.controller2 );

    // The XRControllerModelFactory will automatically fetch controller models
    // that match what the user is holding as closely as possible. The models
    // should be attached to the object returned from getControllerGrip in
    // order to match the orientation of the held device.

    var controllerModelFactory = new XRControllerModelFactory();

    this.controllerGrip1 = this.renderer.xr.getControllerGrip( 0 );
    this.controllerGrip1.add( controllerModelFactory.createControllerModel( this.controllerGrip1 ) );

    this.scene.add( this.controllerGrip1 );

    this.controllerGrip2 = this.renderer.xr.getControllerGrip( 1 );
    this.controllerGrip2.add( controllerModelFactory.createControllerModel( this.controllerGrip2 ) );

    this.scene.add( this.controllerGrip2 );
  }
}