<script>
  import InputButton from "./InputButton.svelte";

  let inputs = $state({
    leftStickX: 0,
    leftStickY: 0,
    rightStickX: 0,
    rightStickY: 0,
    dpadUp: {class: 'col-span-3 w-4 h-2 mt-1 bg-gray-400 rounded-full', state: false},
    dpadDown: {class: 'col-span-3 w-4 h-2 mb-1 bg-gray-400 rounded-full', state: false},
    dpadLeft: {class: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90', state: false},
    dpadRight: {class: 'w-4 h-2 mt-1 bg-gray-400 rounded-full rotate-90', state: false},
    button1: {class: 'col-span-3 rounded-full w-5 h-5 button-1 bg-yellow-500', state: false},
    button2: {class: 'bg-green-500 rounded-full w-5 h-5', state: false},
    button3: {class: 'bg-red-500 rounded-full w-5 h-5', state: false},
    button4: {class: 'col-span-3 bg-blue-500 rounded-full w-5 h-5', state: false},
    triggerLeft: 0,
    triggerRight: 0,
    bumperLeft: false,
    bumperRight: false,
    xboxButton: false
  })

  const setButtonState = (button, state) => {
    inputs[button].state = state;
    inputs[button].class = state ? `${inputs[button].class} ring` : inputs[button].class.replace(' ring', '');
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
  <div class="grid grid-cols-3 absolute top-14 right-12 justify-items-center z-10">  
    {#each ['1', '2', '3', '4'] as b }
      <button class="{inputs[`button${b}`].class}" onmousedown={() => setButtonState(`button${b}`, true)} onmouseup={() => setButtonState(`button${b}`, false)} onmouseleave={() => setButtonState(`button${b}`, false)}></button>
      {#if b === '2'}
        <div class="w-4 h-4"></div>
      {/if}
    {/each}
  </div>

  <!-- D-Pad -->
  <div class="grid grid-cols-3 absolute top-24 left-26 w-10 h-10 bg-gray-600 rounded-full justify-items-center z-10">  
    {#each ['Up', 'Left', 'Right', 'Down'] as b }
      <button class="{inputs[`dpad${b}`].class}" onmousedown={() => setButtonState(`dpad${b}`, true)} onmouseup={() => setButtonState(`dpad${b}`, false)}  onmouseleave={() => setButtonState(`dpad${b}`, false)}></button>
      {#if b === 'Left'}
        <div class="w-2 h-4"></div>
      {/if}
    {/each}
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
      <th>State</th>
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

    {#each ['Up', 'Down', 'Left', 'Right'] as b }
      <tr>
        <td>DPad {b}</td>
        <td>{inputs[`dpad${b}`].state ? 'On' : 'Off'}</td>
      </tr>
    {/each}

    {#each [1,2,3,4] as b }
      <tr>
        <td>Button {b}</td>
        <td>{inputs[`button${b}`].state ? 'On' : 'Off'}</td>
      </tr>
    {/each}

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