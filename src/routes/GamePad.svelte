<script>
  let inputs = $state({
    leftStickX: 0,
    leftStickY: 0,
    rightStickX: 0,
    rightStickY: 0,
    dpadUp: false,
    dpadDown: false,
    dpadLeft: false,
    dpadRight: false,
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    triggerLeft: 0,
    triggerRight: 0,
    bumperLeft: false,
    bumperRight: false,
    xboxButton: false
  })

  const foo = () => {
    console.log('Button A clicked');
    buttonA = !buttonA;
  }

  const buttonPress = (button) => {
    inputs[button] = !inputs[button];
  }

  // $effect(() => {
  //   console.log('Left Stick:', leftStickX, leftStickY);

  // });
</script>

<div class="w-80 h-40 bg-gray-900 rounded-lg shadow-lg relative">
  <!-- Body -->
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-4/5 bg-gray-800 rounded-lg"></div>

  <!-- Grips -->
  <div class="absolute top-2 left-2 w-16 h-36 bg-gray-700 rounded-l-lg z-0"></div>
  <div class="absolute top-2 right-2 w-16 h-36 bg-gray-700 rounded-r-lg z-0"></div>

  <!-- Left Stick -->
  <div class="absolute top-14 left-1/5 w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center z-10">
    <div class="w-4 h-4 bg-gray-400 rounded-full"></div> 
  </div>

    <!-- ABXY Buttons -->  
  <div class="grid grid-cols-3  absolute top-14 right-12 justify-items-center z-10">  
    <button class="col-span-3 rounded-full w-5 h-5 button-1 bg-yellow-500 {inputs['button1'] ? 'ring' : ''}" onclick={() => buttonPress('button1')}></button>  
    <button class="bg-green-500 rounded-full w-5 h-5 button-2 {inputs['button2'] ? 'ring' : ''}" onclick={() => buttonPress('button2')}></button>  
    <div class="w-4 h-4"></div>  
    <button class="bg-red-500 rounded-full w-5 h-5 button-3 {inputs['button3'] ? 'ring' : ''}" onclick={() => buttonPress('button3')}></button>  
    <button class="col-span-3 bg-blue-500 rounded-full w-5 h-5 button-4 {inputs['button4'] ? 'ring' : ''}" onclick={() => buttonPress('button4')}></button>
  </div>

  <!-- D-Pad -->
  <div class="absolute top-24 left-26 w-10 h-10 bg-gray-600 rounded-full flex flex-col justify-center items-center z-10">
    <div class="w-3 h-1 bg-gray-400 rounded-full mb-1"></div>  
    <div class="flex">
      <div class="w-1 h-3 bg-gray-400 rounded-full mr-1 hover:bg-yellow-600"></div>
      <div class="w-3 h-1 bg-gray-600 rounded-full"></div>  
      <div class="w-1 h-3 bg-gray-400 rounded-full ml-1"></div>
    </div>
    <div class="w-3 h-1 bg-gray-400 rounded-full mt-1"></div>
  </div>

  <!-- Right Stick -->
  <div class="absolute top-24 right-26 w-10 h-10 bg-gray-600 rounded-full flex justify-center items-center z-10">
    <div class="w-4 h-4 bg-gray-400 rounded-full"></div> 
  </div>

  <!-- Xbox Button -->
  <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-400 rounded-full flex justify-center items-center z-10">
    <div class="w-3 h-3 bg-gray-900 rounded-full"></div>
  </div>


  <!-- Triggers -->
  <div class="absolute top-12 inset-x-4 flex justify-between z-5">
    <div class="w-6 h-12 bg-gray-500 rounded-lg"></div>
    <div class="w-6 h-12 bg-gray-500 rounded-lg"></div>
  </div>

  <!-- Bumpers -->
  <div class="absolute top-4 inset-x-4 flex justify-between z-5">
    <div class="w-12 h-6 bg-gray-500 rounded-lg z-1"></div>
    <div class="w-12 h-6 bg-gray-500 rounded-lg z-1"></div>
  </div>
</div>

<!-- Controller Input Table -->
<table class="table-auto mt-4">
  <thead>
    <tr>
      <th>Input</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Left Stick</td>
      <td>Controls movement</td>
    </tr>
    <tr>
      <td>Right Stick</td>
      <td>Controls camera</td>
    </tr>
    <tr>
      <td>D-Pad</td>
      <td>Directional input</td>
    </tr>
    <tr>
      <td>A/B/X/Y Buttons</td>
      <td>Action buttons</td>
    </tr>
    <tr>
      <td>Triggers</td>
      <td>Additional actions</td>
    </tr>
    <tr>
      <td>Bumpers</td>
      <td>Additional actions</td>
    </tr>
    <tr>
      <td>Xbox Button</td>
      <td>System menu</td>
    </tr>
  </tbody>
</table>