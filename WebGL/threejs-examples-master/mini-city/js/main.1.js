var scene, camera
var renderer
var width, width

var cars = []
// var stats

var config = {
  isMobile: false,
  background: 0x282828
}

width = window.innerWidth
height = window.innerHeight

scene = new THREE.Scene() // 新建一个场景
camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000) // 新建一个透视摄像机, 并设置 视场, 视野长宽比例, 可见远近范围
// 摄像机的位置
camera.position.set(0, 330, 330)
camera.lookAt(scene.position) // 设置摄像机观察的方向

renderer = new THREE.WebGLRenderer({ antialias: true }) // 新建一个渲染器, 渲染器用来输出最终结果
renderer.setSize(width, height) // 设置渲染的尺寸, 在这里是浏览器尺寸
renderer.setClearColor(config.background)  // 设置背景的颜色
renderer.shadowMap.enabled = true // 设置是否开启投影, 开启的话, 光照会产生投影
renderer.shadowMap.type = THREE.PCFSoftShadowMap // 设置投影类型, 这边是柔和投影
document.body.appendChild(renderer.domElement) // renderer.domElement 是渲染器用来显示结果的 canvas 标签

// 检查客户端
checkUserAgent()
// 设置辅助线 以及鼠标插件
buildAuxSystem()
// 设置光照
buildLightSystem()
// 构造建筑物
buildbuilding()
//buildRoad()
//buildStaticCars()
//buildMovingCars()

loop()
onWindowResize()



function checkUserAgent() {
  var n = navigator.userAgent;
  if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
    config.isMobile = true
    camera.position.set(420, 420, 420)
    renderer.shadowMap.enabled = false
  }
}
// 动态的车
function buildMovingCars() {
  var carsPosition = [
    [-130, 145, 0],
    [10, 145, 0],
    [145, 20, 0.5],
    [30, -145, 1],
    [-145, -60, 1.5]
  ]
  carsPosition.forEach(function(elem) {
    var car = new Car()
    var x = elem[0],
      z = elem[1],
      r = elem[2]
    car.setPosition(x, 0, z)
    car.mesh.rotation.y = r * Math.PI
    cars.push(car)
    scene.add(car.mesh)
  })
}
// 静止的车
function buildStaticCars() {
  var carsPosition = [
    [-84, 82, 1.5],
    [-58, 82, 1.5],
    [-32, 82, 1.5],
    [84, 82, 1.5]
  ]
  carsPosition.forEach(function(elem) {
    var car = new Car()
    var x = elem[0],
      z = elem[1],
      r = elem[2]
    car.setPosition(x, 0, z)
    car.mesh.rotation.y = r * Math.PI
    scene.add(car.mesh)
  })
}

function buildRoad() {
  var road = new THREE.Object3D()
  // 路线颜色
  // 测试 0x008000
  var roadColor = 0xffffff 
  var roadBorderOuterCoords = [
    [-160, 160],
    [160, 160],
    [160, -160],
    [-160, -160],
  ]
  // 路最外层边框
  var roadBorderOuterHoleCoords = [
    [-159, 159],
    [-159, -159],
    [159, -159],
    [159, 159]
  ]
  var roadBorderOuterShape = utils.makeShape(roadBorderOuterCoords, roadBorderOuterHoleCoords)

  var roadBorderOuterGeometry = utils.makeExtrudeGeometry(roadBorderOuterShape, 0.1)
  var roadBorderOuter = utils.makeMesh('phong', roadBorderOuterGeometry, roadColor)
  road.add(roadBorderOuter)
  
  // 路最内层边框
  var roadBorderInnerCoords = [
    [-131, 131],
    [-131, -131],
    [131, -131],
    [131, 131],
    [19, 131],
    [19, 99],
    [99, 99],
    [99, -99],
    [-99, -99],
    [-99, 99],
    [-19, 99],
    [-19, 131]
  ]
  var roadBorderInnerShape = utils.makeShape(roadBorderInnerCoords)
  var roadBorderInnnerGeometry = utils.makeExtrudeGeometry(roadBorderInnerShape, 0.1)
  var roadBoaderInnder = utils.makeMesh('phong', roadBorderInnnerGeometry, roadColor)
  roadBoaderInnder.rotation.y = Math.PI
  road.add(roadBoaderInnder)

  var roadLinesGeometry = new THREE.Geometry()

  // 构造马路中间线立方体的长宽高
  var roadLineGeometry = new THREE.BoxGeometry(20, 0.1, 2)

  var roadLinesBottomGeometry = new THREE.Geometry()
  for (var i = 0; i < 9; i++) {
    var geometry = roadLineGeometry.clone()
    geometry.translate(i * 30, 0, -1)
    roadLinesBottomGeometry.merge(geometry)
  }
  roadLinesBottomGeometry.translate(-120, 0, 145)
  roadLinesGeometry.merge(roadLinesBottomGeometry)

  var roadLinesTopGeometry = roadLinesBottomGeometry.clone()
  roadLinesTopGeometry.translate(0, 0, -290)
  roadLinesGeometry.merge(roadLinesTopGeometry)

  var roadLinesLeftGeometry = roadLinesBottomGeometry.clone()
  roadLinesLeftGeometry.rotateY(0.5 * Math.PI)
  roadLinesGeometry.merge(roadLinesLeftGeometry)

  var roadLinesRightGeometry = roadLinesBottomGeometry.clone()
  roadLinesRightGeometry.rotateY(-0.5 * Math.PI)
  roadLinesGeometry.merge(roadLinesRightGeometry)
  roadLinesGeometry = new THREE.BufferGeometry().fromGeometry(roadLinesGeometry)
  var roadLines = utils.makeMesh('phong', roadLinesGeometry, roadColor)
  road.add(roadLines)

  scene.add(road)
}

function buildbuilding() {
  // 创建底座 长/宽/高
  var planeGeometry = new THREE.BoxBufferGeometry(320, 6, 200)
  // 设置材质
  var plane = utils.makeMesh('lambert', planeGeometry, 0xCDC673)
  // 网格线上浮
  plane.position.y = -3
  // 添加网格线
  scene.add(plane)
  
  // 篱笆
  //addFense()
  // 草坪
  //addGreen()
  // 树
  //addTrees()
  // 医院
  //addHospital()
  // 路灯
  //addLamps()
  room()
  waterDispenser()
  machine()
  fileCabinets()

  // 房间主结构
  function room() {
    // 墙
    var room = new THREE.Object3D()
    var wallCoords = [
      [-160, -100],
      [-160, 100],
      [160, 100],
      [160, -100],
      [-160, -100]
    ]
    var wallHolePath = [
      [-155, -95],
      [155, -95],
      [155, 95],
      [-155, 95],
      [-155, -95]
    ]
    var wallShape = utils.makeShape(wallCoords, wallHolePath) 
    var wallGeometry = utils.makeExtrudeGeometry(wallShape, 90)
    var wall = utils.makeMesh('lambert', wallGeometry, 0x9cb2d1)
    scene.add(wall)
    // 隔断墙
    var separatorGeometry = new THREE.BoxBufferGeometry(5, 90, 190)
    var separator = utils.makeMesh('phong', separatorGeometry, 0x9cb2d1)
    separator.receiveShadow = false
    separator.position.set(-40, 45, 0)
    scene.add(separator)

    // 门
    var door1 = new THREE.BoxBufferGeometry(40, 91, 7)
    var door = utils.makeMesh('phong', door1, 0xD2691E)
    door.receiveShadow = false
    door.position.set(-95, 45, 98)
    scene.add(door)
    // 门把手
    var doorknobGeo = new THREE.CylinderGeometry(3, 3, 6,40 ,40);
    var doorknob = utils.makeMesh('lambert', doorknobGeo, 0xBDB76B)
    doorknob.rotation.x = -0.5 * Math.PI
    doorknob.position.set(-80, 45, 103) //设置圆柱坐标 
    scene.add(doorknob)
  }

// 饮水机
function waterDispenser() {
  var waterDispenser = new THREE.Object3D()
  
  // 饮水机柜
  var waterDispenserCoords = [
    [-15, -30],
    [-15, 30],
    [15, 30],
    [15, -30],
    [-15, -30]
  ]
  var waterDispenserHolePath = [
    [-14, -29],
    [14, -29],
    [14, 29],
    [-14, 29],
    [-14, -29]
  ]
  var waterDispenserShape = utils.makeShape(waterDispenserCoords,waterDispenserHolePath) 
  var waterDispenserGeometry = utils.makeExtrudeGeometry(waterDispenserShape, 20)
  var waterDispenserMain = utils.makeMesh('lambert', waterDispenserGeometry, 0x00ffffff)
  waterDispenserMain.rotation.x = -0.5 * Math.PI
  waterDispenserMain.position.x = -135
  waterDispenserMain.position.y = 30
  waterDispenserMain.position.z = -75
  waterDispenser.add(waterDispenserMain)
  // 饮水机隔断
  var waterDispenserSeparatorGeometry = new THREE.BoxBufferGeometry(28, 1, 20)
  var waterDispenserSeparator = utils.makeMesh('phong', waterDispenserSeparatorGeometry, 0x00ffffff)
  waterDispenserSeparator.receiveShadow = false
  waterDispenserSeparator.position.set(-135, 35, -85)
  waterDispenser.add(waterDispenserSeparator)
  // 饮水机下面板
  var waterDispenserUpGeometry = new THREE.BoxBufferGeometry(28, 32, 1)
  var waterDispenserUp = utils.makeMesh('phong', waterDispenserUpGeometry, 0x00000000)
  waterDispenserUp.receiveShadow = false
  waterDispenserUp.position.set(-135, 18, -75)
  waterDispenser.add(waterDispenserUp)
  // 饮水机下面板提手
  var waterDispenserUpBarGeometry = new THREE.BoxBufferGeometry(20, 1, 1)
  var waterDispenserUpBar = utils.makeMesh('phong', waterDispenserUpBarGeometry, 0x00ffffff)
  waterDispenserUpBar.receiveShadow = false
  waterDispenserUpBar.position.set(-135, 20, -74)
  waterDispenser.add(waterDispenserUpBar)
  // 饮水机上面板
  var waterDispenserDownGeometry = new THREE.BoxBufferGeometry(28, 23, 1)
  var waterDispenserDown = utils.makeMesh('phong', waterDispenserDownGeometry, 0x00ff0000)
  waterDispenserDown.receiveShadow = false
  waterDispenserDown.position.set(-135, 47, -75)
  waterDispenser.add(waterDispenserDown)
  // 饮水机上面板提手
  var waterDispenserDownBarGeometry = new THREE.BoxBufferGeometry(6, 1, 1)
  var waterDispenserDownBar = utils.makeMesh('phong', waterDispenserDownBarGeometry, 0x00ffffff)
  waterDispenserDownBar.receiveShadow = false
  waterDispenserDownBar.position.set(-135, 47, -74)
  waterDispenser.add(waterDispenserDownBar)
  scene.add(waterDispenser)
}

  // 机柜
  function machine() {
    var machinePosition = [
      [0, 34, -70],
      [40, 34, -70],
      [80, 34, -70],
      [0, 34, -20],
      [40, 34, -20],
      [80, 34, -20],
      [0, 34, 30],
      [40, 34, 30],
      [80, 34, 30]           
    ]

    var machineGeometry = new THREE.BoxBufferGeometry(28, 70, 20)
    var machine = utils.makeMesh('phong', machineGeometry, 0x575757) 
    machine.receiveShadow = false
    for (var i = 0; i < 9; i++){
      var machineClone = machine.clone()
      machineClone.position.set(machinePosition[i][0], machinePosition[i][1], machinePosition[i][2])
      scene.add(machineClone)
    }  
  }  
  // 文件柜
  function fileCabinets() {
    // 创建立方体几何体-柜子
    var sphereGeometry = new THREE.BoxGeometry(30, 80, 50)
    var sphere = utils.makeMesh('phong', sphereGeometry, 0xEBEBEB)
    // 创建立方体几何体-柜子窗户
    var cubeGeometry = new THREE.BoxGeometry(20, 10, 10)
    var cube1 = utils.makeMesh('phong', cubeGeometry, 0x00000000)
    cube1.position.y = 25
    cube1.position.x = -10
    cube1.position.z = 15

    var cube2 = cube1.clone()
    cube2.position.z = 0

    var cube3 = cube1.clone()
    cube3.position.z = -15

    // 创建梯形体-柜子低凹槽
    var cube4Geometry = new THREE.Geometry()

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    // 创建立方体的顶点
    var vertices = [
        new THREE.Vector3(15, 10, 4), //v0
        new THREE.Vector3(-15, 10, 4), //v1
        new THREE.Vector3(-20, 0, 4), //v2
        new THREE.Vector3(20, 0, 4), //v3
        new THREE.Vector3(20, 0, -4), //v4
        new THREE.Vector3(15, 10, -4), //v5
        new THREE.Vector3(-15, 10, -4), //v6
        new THREE.Vector3(-20, 0, -4) //v7
    ];
    cube4Geometry.vertices = vertices

    //创建立方的面
    var faces=[
        new THREE.Face3(0,1,2),
        new THREE.Face3(0,2,3),
        new THREE.Face3(0,3,4),
        new THREE.Face3(0,4,5),
        new THREE.Face3(1,6,7),
        new THREE.Face3(1,7,2),
        new THREE.Face3(6,5,4),
        new THREE.Face3(6,4,7),
        new THREE.Face3(5,6,1),
        new THREE.Face3(5,1,0),
        new THREE.Face3(3,2,7),
        new THREE.Face3(3,7,4)
    ];
    cube4Geometry.faces = faces

    //生成法向量
    cube4Geometry.computeFaceNormals();
    var cube4Material = new THREE.MeshLambertMaterial({color: 0x00ffff})
        cube4 = new THREE.Mesh(cube4Geometry, cube4Material)
        cube4.rotation.y = -0.5 * Math.PI
        cube4.position.y = -40
        cube4.position.x = -15
        cube4.position.z = 0

    //生成ThreeBSP对象
    var sphereBSP = new ThreeBSP(sphere)
    var cube1BSP = new ThreeBSP(cube1)
    var result1BSP = utils.bsp('subtract', sphereBSP, cube1BSP)

    var cube2BSP = new ThreeBSP(cube2)
    var result2BSP = utils.bsp('subtract', result1BSP, cube2BSP)

    var cube3BSP = new ThreeBSP(cube3)
    var result3BSP = utils.bsp('subtract', result2BSP, cube3BSP)

    var cube4BSP = new ThreeBSP(cube4)
    var result4BSP = utils.bsp('subtract',result3BSP,cube4BSP)
    
    // 重新赋值一个纹理
    var result = utils.bspMesh('phong',0xEBEBEB,result4BSP)
    result.position.set(140, 47, 65)  
    // 将计算出来模型添加到场景当中
    scene.add(result)

    var fileCabinetsBlue = new THREE.Object3D()
    // 蓝色文件柜
    var fileCabinets1Geometry = new THREE.BoxGeometry(15, 60, 20)
    var fileCabinets1 = utils.makeMesh('phong', fileCabinets1Geometry, 0x27408B) 
    // 窗户
    var glassHoleGeometry = new THREE.BoxGeometry(10, 20, 12)
    var glassHole = utils.makeMesh('phong', glassHoleGeometry, 0x27408B) 
    glassHole.position.x = -5
    glassHole.position.y = 15
  
    var glassHoleBSP = new ThreeBSP(glassHole)
    var fileCabinets1BSP = new ThreeBSP(fileCabinets1)
    var fileCabinets1ResultBSP = utils.bsp('subtract', fileCabinets1BSP, glassHoleBSP)
    var fileCabinets1Result = utils.bspMesh('phong',0x27408B,fileCabinets1ResultBSP)
    fileCabinets1Result.position.set(140, 47, 24)
    fileCabinetsBlue.add(fileCabinets1Result)
    // 玻璃
    var glassGeometry = new THREE.BoxGeometry(1, 20, 12)
    var glass = utils.makeMesh('lambert', glassGeometry, 0XECF1F3)
    glass.position.set(133, 62, 24)
    fileCabinetsBlue.add(glass)
    scene.add(fileCabinetsBlue)
    
  }



  function addLamps() {
    var lampsPosition = [
      [-12.5, 12.5, 1.25],
      [-7.5, 12.5, -0.5],
      [-2.5, 12.5, -0.5],
      [2.5, 12.5, -0.5],
      [7.5, 12.5, -0.5],
      [12.5, 12.5, -0.25],
      [12.5, 7.5, 0],
      [12.5, 2.5, 0],
      [12.5, -2.5, 0],
      [12.5, -7.5, 0],
      [12.5, -12.5, 0.25],
      [7.5, -12.5, 0.5],
      [2.5, -12.5, 0.5],
      [-2.5, -12.5, 0.5],
      [-7.5, -12.5, 0.5],
      [-12.5, -12.5, 0.75],
      [-12.5, -7.5, 1],
      [-12.5, -2.5, 1],
      [-12.5, 2.5, 1],
      [-12.5, 7.5, 1],
    ]

    lampsPosition.forEach(function(elem) {
      var x = elem[0] * 10,
        z = elem[1] * 10,
        r = elem[2]
      var lamp = createLamp()
      lamp.rotation.y = r * Math.PI
      lamp.position.set(x, 0, z)
      scene.add(lamp)
    })
  }

  function addHospital() {
    var hospital = createHospital()
    hospital.position.z = -20
    scene.add(hospital)
  }

  function addGreen() {
    var greenCoords = [
      [-120, -120],
      [-120, 120],
      [120, 120],
      [120, -120],
      [20, -120],
      [20, -100],
      [100, -100],
      [100, 100],
      [-100, 100],
      [-100, -100],
      [-20, -100],
      [-20, -120],
      [-120, -120]
    ]
    var greenShape = utils.makeShape(greenCoords)
    var greenGeometry = utils.makeExtrudeGeometry(greenShape, 3)
    var green = utils.makeMesh('lambert', greenGeometry, 0xc0c06a)
    scene.add(green)
  }
	// 添加墙
  function addFense() {
    var fenseCoords = [
      [-130, -130],
      [-130, 130],
      [130, 130],
      [130, -130],
      [20, -130],
      [20, -120],
      [120, -120],
      [120, 120],
      [-120, 120],
      [-120, -120],
      [-20, -120],
      [-20, -130],
      [-130, -130]
    ]
    var fenseShape = utils.makeShape(fenseCoords)

    var fenseGeometry = utils.makeExtrudeGeometry(fenseShape, 3)
    var fense = utils.makeMesh('lambert', fenseGeometry, 0xe5cabf)
    scene.add(fense)
  }

  // 添加树
  function addTrees() {
    var treesPosition = [
      [-110, -110],
      [-90, -110],
      [-70, -110],
      [-50, -110],
      [-30, -110],
      [-10, -110],
      [10, -110],
      [30, -110],
      [50, -110],
      [70, -110],
      [90, -110],
      [-110, 110],
      [-110, 90],
      [-110, 70],
      [-110, 50],
      [-110, 30],
      [-110, 10],
      [-110, -10],
      [-110, -30],
      [-110, -50],
      [-110, -70],
      [-110, -90],
      [110, 110],
      [90, 110],
      [70, 110],
      [50, 110],
      [30, 110],
      [-30, 110],
      [-50, 110],
      [-70, 110],
      [-90, 110],
      [110, -110],
      [110, -90],
      [110, -70],
      [110, -50],
      [110, -30],
      [110, -10],
      [110, 10],
      [110, 30],
      [110, 50],
      [110, 70],
      [110, 90],
    ]
    treesPosition.forEach(function(elem) {
      var x = elem[0],
        y = 1,
        z = elem[1]
      var tree = createTree(x, y, z)
      scene.add(tree)
    })
  }
  // 创造灯
  function createLamp() {
    var lamp = new THREE.Object3D()
    var pillarGeomertry = new THREE.CubeGeometry(2, 30, 2)
    pillarGeomertry.translate(0, 15, 0)
    var pillar = utils.makeMesh('phong', pillarGeomertry, 0xebd1c2)
    lamp.add(pillar)

    var connectGeometry = new THREE.CubeGeometry(10, 1, 1)
    var connect = utils.makeMesh('phong', connectGeometry, 0x2c0e0e)
    connect.position.set(3, 30, 0)
    lamp.add(connect)

    var lightGeometry = new THREE.CubeGeometry(6, 2, 4)
    light = utils.makeMesh('phong', lightGeometry, 0xebd1c2)
    light.position.set(10, 30, 0)
    lamp.add(light)

    return lamp
  }
  
  function createHospital() {
    var hospital = new THREE.Object3D()
    
    // 底座
    var baseGeometry = new THREE.BoxBufferGeometry(180, 3, 140)
    var base = utils.makeMesh('lambert', baseGeometry, 0xffffff)
    base.position.y = 1
    hospital.add(base)
    
    // 楼的主体
    var frontMainCoords = [
      [-80, -30],
      [-80, 20],
      [50, 20],
      [50, 0],
      [20, -30],
      [-80, -30]
    ]
    var frontMainShape = utils.makeShape(frontMainCoords)
    var frontMainGeometry = utils.makeExtrudeGeometry(frontMainShape, 100)
    var frontMainMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
    frontMainMaterial.map.repeat.set(0.1, 0.08)
    var frontMain = new THREE.Mesh(frontMainGeometry, frontMainMaterial)
    frontMain.castShadow = true
    frontMain.receiveShadow = true
    hospital.add(frontMain)

    // 楼顶地板
    var frontTopShape = frontMainShape
    var frontTopGeometry = utils.makeExtrudeGeometry(frontTopShape, 5)
    var frontTop = utils.makeMesh('lambert', frontTopGeometry, 0xb1a7af)
    frontTop.position.y = 100
    hospital.add(frontTop)

    // 楼顶架
    var frontRoofShelfGeometry = new THREE.Geometry()
    var frontRoofShelfCubeGeometry = new THREE.BoxGeometry(2, 2, 40)
    // for z-axis
    for (var i = 0; i < 12; i++) {
      var geometry = frontRoofShelfCubeGeometry.clone()
      geometry.translate(i * 5, 0, 0)
      frontRoofShelfGeometry.merge(geometry)
    }
    // for x-axis
    for (var i = 0; i < 2; i++) {
      var geometry = frontRoofShelfCubeGeometry.clone()
      geometry.rotateY(0.5 * Math.PI)
      geometry.scale(1.6, 1, 1)
      geometry.translate(27, 0, -15 + i * 30)
      frontRoofShelfGeometry.merge(geometry)
    }
    // for y-axis
    var frontRoofShelfCubeYPosition = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1]
    ]
    for (var i = 0; i < frontRoofShelfCubeYPosition.length; i++) {
      var p = frontRoofShelfCubeYPosition[i]
      var geometry = frontRoofShelfCubeGeometry.clone()
      geometry.scale(1, 1, 0.4)
      geometry.rotateX(0.5 * Math.PI)
      geometry.translate(p[0] * 55, 0, -15 + p[1] * 30)
      frontRoofShelfGeometry.merge(geometry)
    }
    frontRoofShelfGeometry = new THREE.BufferGeometry().fromGeometry(frontRoofShelfGeometry)
    var frontRoofShelf = utils.makeMesh('phong', frontRoofShelfGeometry, 0xffffff)
    frontRoofShelf.position.set(-70, 115, 5)
    hospital.add(frontRoofShelf)

    // 楼前的平台
    var frontPlatGeometry = new THREE.BoxBufferGeometry(150, 3, 90)
    var fronPlat = utils.makeMesh('lambert', frontPlatGeometry, 0x0792a5)
    fronPlat.position.set(-3, 18, 25)
    hospital.add(fronPlat)

    // 楼前的平台的前护栏
    var frontPlatVerticalGeometry = new THREE.BoxBufferGeometry(150, 15, 3)
    var frontPlatVertical = utils.makeMesh('phong', frontPlatVerticalGeometry, 0x0792a5)
    frontPlatVertical.receiveShadow = false
    frontPlatVertical.position.set(-3, 24, 68.5)
    hospital.add(frontPlatVertical)

    // 楼前的平台的前护栏的白色护栏块
    var frontPlatVerticalWhiteGeometry = new THREE.BoxBufferGeometry(150, 3, 3)
    var frontPlatVerticalWhite = utils.makeMesh('phong', frontPlatVerticalWhiteGeometry, 0xffffff)
    frontPlatVerticalWhite.position.set(-3, 33, 68.5)
    hospital.add(frontPlatVerticalWhite)

    // 楼前的平台的左底柱
    var frontPlatPillarGeometry = new THREE.CylinderGeometry(2, 2, 15, 32)
    var frontPlatPillar = utils.makeMesh('lambert', frontPlatPillarGeometry, 0xffffff)
    frontPlatPillar.position.set(-60, 10, 55)
    hospital.add(frontPlatPillar)

    // 楼前的平台的右底柱
    var frontPlatPillar2 = frontPlatPillar.clone()
    frontPlatPillar2.position.set(55, 10, 55)
    hospital.add(frontPlatPillar2)

    // 楼的主体骨架
    var frontBorderVerticles = new THREE.Object3D()
    var frontBorderVerticleGeometry = new THREE.BoxBufferGeometry(4, 106, 4)
    var frontBorderVerticleMesh = utils.makeMesh('phong', frontBorderVerticleGeometry, 0xffffff)
    var frontBorderVerticle1 = frontBorderVerticleMesh.clone()
    frontBorderVerticle1.position.set(-80, 52, 30)
    frontBorderVerticles.add(frontBorderVerticle1)
    var frontBorderVerticle2 = frontBorderVerticleMesh.clone()
    frontBorderVerticle2.position.set(-80, 52, -20)
    frontBorderVerticles.add(frontBorderVerticle2)
    var frontBorderVerticle3 = frontBorderVerticleMesh.clone()
    frontBorderVerticle3.position.set(50, 52, -18)
    frontBorderVerticles.add(frontBorderVerticle3)
    hospital.add(frontBorderVerticles)

    // 楼的屋顶骨架
    var frontRoofCoords = [
      [-82, -32],
      [20, -32],
      [52, 0],
      [52, 22],
      [-82, 22],
      [-82, -32]
    ]
    var frontRoofHolePath = [
      [-78, -28],
      [20, -28],
      [48, 0],
      [48, 18],
      [-78, 18],
      [-78, -28]
    ]
    var frontRoofShape = utils.makeShape(frontRoofCoords, frontRoofHolePath)
    var frontRoofGeometry = utils.makeExtrudeGeometry(frontRoofShape, 8)
    var frontRoof = utils.makeMesh('phong', frontRoofGeometry, 0xffffff)
    frontRoof.position.y = 100
    hospital.add(frontRoof)

    // 后楼的主体
    var backMainCoords = [
      [-80, 20],
      [-80, 60],
      [80, 60],
      [80, 20],
      [-80, 20]
    ]
    var backMainHolePath = [
      [-78, 22],
      [78, 22],
      [78, 58],
      [-78, 58],
      [-78, 22]
    ]
    var backMainShape = utils.makeShape(backMainCoords, backMainHolePath)

    var backMainGeometry = utils.makeExtrudeGeometry(backMainShape, 90)
    var backMain = utils.makeMesh('lambert', backMainGeometry, 0xf2e21b)
    hospital.add(backMain)

    var backMiddleCoords = [
      [0, 0],
      [36, 0],
      [36, 70],
      [0, 70],
      [0, 0]
    ]
    var backMiddleHolePath = [
      [2, 2],
      [34, 2],
      [34, 68],
      [2, 68],
      [2, 2]
    ]
    var backMiddleShape = utils.makeShape(backMiddleCoords, backMiddleHolePath)
    var backMiddkeGeometry = utils.makeExtrudeGeometry(backMiddleShape, 165)
    var backMiddle = utils.makeMesh('lambert', backMiddkeGeometry, 0xffffff)

    backMiddle.rotation.x = -0.5 * Math.PI
    backMiddle.rotation.z = -0.5 * Math.PI
    backMiddle.position.y = 86
    backMiddle.position.z = -58
    backMiddle.position.x = -78
    //hospital.add(backMiddle)

    var backMiddleWindowGeometry = new THREE.PlaneGeometry(32, 66, 1, 1)
    var backMiddleWindowMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
    backMiddleWindowMaterial.map.repeat.set(2, 6)

    var backMiddleWindow = new THREE.Mesh(backMiddleWindowGeometry, backMiddleWindowMaterial)
    backMiddleWindow.position.set(83, 51, -40)
    backMiddleWindow.rotation.y = 0.5 * Math.PI
    //hospital.add(backMiddleWindow)

    var windowBackOrigin = createWindow()
    windowBackOrigin.scale.set(0.6, 0.6, 1)
    windowBackOrigin.rotation.y = Math.PI
    windowBackOrigin.position.set(65, 75, -61)
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 4; j++) {
        var windowObj = windowBackOrigin.clone()
        windowObj.position.x -= i * 22
        windowObj.position.y -= j * 20
        //hospital.add(windowObj)
      }
    }

    return hospital
  }

  function createWindow() {
    var windowObj = new THREE.Object3D()
    var glassGeometry = new THREE.PlaneGeometry(20, 20)
    var glass = utils.makeMesh('phong', glassGeometry, 0x6a5e74)
    windowObj.add(glass)

    var windowBorderGeometry = new THREE.BoxBufferGeometry(22, 2, 2)
    var windowBorder = utils.makeMesh('phong', windowBorderGeometry, 0xffffff)

    var windowBorderTop = windowBorder.clone()
    windowBorderTop.position.y = 10
    windowObj.add(windowBorderTop)

    var windowBorderBottom = windowBorder.clone()
    windowBorderBottom.position.y = -10
    windowObj.add(windowBorderBottom)

    var windowBorderLeft = windowBorder.clone()
    windowBorderLeft.rotation.z = 0.5 * Math.PI
    windowBorderLeft.position.x = -10
    windowObj.add(windowBorderLeft)

    var windowBorderRight = windowBorderLeft.clone()
    windowBorderRight.position.x = 10
    windowObj.add(windowBorderRight)

    return windowObj
  }
  // 单体树
  function createTree(x, y, z) {
    var x = x || 0
    var y = y || 0
    var z = z || 0

    var tree = new THREE.Object3D() // 新建一个空对象用来放 树干 和 树叶 部分

    var treeTrunkGeometry = new THREE.BoxBufferGeometry(2, 16, 2) // 树干
    var treeTrunk = utils.makeMesh('lambert', treeTrunkGeometry, 0x8a613a)
    treeTrunk.position.y = 8 // 树干 y 轴位置
    tree.add(treeTrunk) // 树干添加到空对象中

    var treeLeafsGeometry = new THREE.BoxBufferGeometry(8, 8, 8) // 树叶
    var treeLeafs = utils.makeMesh('lambert', treeLeafsGeometry, 0x9c9e5d)
    treeLeafs.position.y = 13 // 树叶 y 轴的位置
    tree.add(treeLeafs) // 树叶添加到空对象中

    tree.position.set(x, y, z)

    return tree // 返回 树 = 树干 + 树叶 对象
  }
}
// 路灯
function buildLightSystem() {

  if (!config.isMobile) {
    // 平行的一束光，模拟从很远处照射的太阳光
    // DirectionalLight( color, intensity )
    // color — 光的颜色值，十六进制，默认值为0xffffff.
    // intensity — 光的强度，默认值为1.  
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(300, 1000, 500);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    var d = 300;
    // 正交投影相机
    // var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight)
    // 环境光( AmbientLight )：笼罩在整个空间无处不在的光
    var light = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(light)
  } else {
    // 半球光光源( HemisphereLight )
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 1)
    scene.add(hemisphereLight)
    var light = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(light)
  }

}

function buildAuxSystem() {
  // stats = new Stats()
  // stats.setMode(0)
  // stats.domElement.style.position = 'absolute'
  // stats.domElement.style.left = '5px'
  // stats.domElement.style.top = '5px'
  // document.body.appendChild(stats.domElement)

  // var axisHelper = new THREE.AxesHelper(200)
  // scene.add(axisHelper)

  // 创建网格辅助线
  var gridHelper = new THREE.GridHelper(320, 32)
  scene.add(gridHelper)

  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  controls.enableDamping = true
  // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
  controls.dampingFactor = 0.25
  // 旋转速度
  controls.rotateSpeed = 0.35
}

function carMoving(car) {
  var angle = car.mesh.rotation.y
  var x = car.mesh.position.x,
    z = car.mesh.position.z

  if (x < 145 && z === 145) {
    car.forward()
  } else if (angle < 0.5 * Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else if (x === 145 && z > -145) {
    car.forward()
  } else if (angle < Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else if (x > -145 && z == -145) {
    car.forward()
  } else if (angle < 1.5 * Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else if (x === -145 && z < 145) {
    car.mesh.rotation.y = 1.5 * Math.PI
    car.forward()
  } else if (angle < 2 * Math.PI) {
    car.turnLeft(0.5 * Math.PI, 0.1)
  } else {
    car.setPosition(-145, 0, 145)
    car.mesh.rotation.set(0, 0, 0)
  }
}

function loop() {
  // stats.update()
  cars.forEach(function(car) {
    carMoving(car)
  })
  renderer.render(scene, camera) // 渲染器开始渲染, scene 和 camera 是必须参数, 因为场景里有动画, 所以放在 loop 里循环
  requestAnimationFrame(loop)
}

function onWindowResize() {
  window.addEventListener('resize', function() {
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height;
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  })
}