<script>
  import InputButton from "./InputButton.svelte";
  let toggle = $state(false);

  let buttons = $state({
    button1: false,
    button2: false,
    button3: false,
    button4: false
  })

  const toggleButton = (button) => {
    console.log(button)
    buttons[button] = !buttons[button];
  }

</script>

  <div class="grid grid-cols-3 gap-1 absolute top-14 right-12 justify-items-center">  
    <div class="col-span-3 rounded-full w-4 h-4 button-1 bg-yellow-500 {toggle ? 'ring' : ''}"><InputButton isActive={toggle} /></div>  
    <div class="bg-green-500 rounded-full w-4 h-4 button-2" onclick={() => toggleButton('button2')}></div>  
    <div class="w-4 h-4"></div>  
    <div class="bg-red-500 rounded-full w-4 h-4 button-3"></div>  
    <div class="col-span-3 bg-blue-500 rounded-full w-4 h-4 button-4"></div>
  </div>

<pre>
  {JSON.stringify(buttons, null, 2)}
</pre>