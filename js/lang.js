var userLang = navigator.language || navigator.userLanguage; 

if (userLang !== "pt-BR" & userLang !== "pt-PT") {
  userLang = "en-GB";
}

function updateLang(lang = userLang) {
  for (var el in pageData) {
    document.getElementById(el).innerHTML = pageData[el][lang];
  }
}

var pageData = {
  "tx-title": {
    "pt-BR":"Tibia10to11 - Migre suas hotkeys do cliente antigo para o novo",
    "en-GB":"Tibia10to11 - Migrate your hotkeys from the old to the new client"
  },
    "tx-selhkset": {
    "pt-BR":"Selecione os sets de hotkey que você quer migrar:",
    "en-GB":"Select the hotkey sets you want to migrate:"
  },
    "tx-useDefaultFile": {
    "pt-BR":"Usar as configurações padrão do Tibia 11",
    "en-GB":"Use default Tibia 11 configurations"
  },
  "tx-instructions": {
    "pt-BR":"Instruções",
    "en-GB":"Instructions"
  },
  "tx-instr1": {
    "pt-BR":"Feche todos clientes do Tibia abertos no momento.",
    "en-GB":"Close any Tibia client you have open at the moment."
  },
  "tx-instr2": {
    "pt-BR":"Selecione o arquivo do Tibia 10 e clique em 'Load'. O arquivo fica em <br><code>C:\\Users\\[UserName]\\AppData\\Roaming\\Tibia\\Tibia.cfg</code>.",
    "en-GB":"Select Tibia 10 file and press 'Load'. The file should be located in <br><code>C:\\Users\\[UserName]\\AppData\\Roaming\\Tibia\\Tibia.cfg</code>."
  },
  "tx-instr3": {
    "pt-BR":"Selecione os sets de hotkeys que você quer migrar. Todos são selecionados por padrão.",
    "en-GB":"Select the hotkey sets you want to migrate. All sets are selected by default."
  },
  "tx-instr4": {
    "pt-BR":"Selecione o arquivo do Tibia 11 ou use o padrão e clique em 'Load'. O arquivo fica em <br><code>C:\\Users\\[UserName]\\AppData\\Local\\Tibia\\packages\\Tibia\\conf\\clientoptions.json</code>.",
    "en-GB":"Select Tibia 11 file or use default and press 'Load'. The file should be in <br><code>C:\\Users\\[UserName]\\AppData\\Local\\Tibia\\packages\\Tibia\\conf\\clientoptions.json</code>."
  },
  "tx-instr5": {
    "pt-BR":"Clique em 'GO!' para gerar o novo arquivo do Tibia 11.",
    "en-GB":"Press 'GO!' to generate the new Tibia 11 file."
  },
  "tx-instr6": {
    "pt-BR":"Recomendamos que você faça um backup do arquivo <code>clientoptions.json</code> original antes de substituí-lo com o novo. Você pode simplesmente renomeá-lo ou copiar para uma pasta de documentos, ou fazer ambos.",
    "en-GB":"We recommend making a backup copy of the original <code>clientoptions.json</code> file before replacing it with the new one. You can just rename the old one or copy it to a Documents folder, or both."
  },
  "tx-instr7": {
    "pt-BR":"Salve o arquivo baixado na mesma pasta que o arquivo original.",
    "en-GB":"Save the downloaded file on the same folder as the original file."
  },
  "tx-instr8": {
    "pt-BR":"Antes de sair por aí matando Demons, verifique se tudo está funcionando corretamente no Tibia. Divirta-se!",
    "en-GB":"Before you start running around killing Demons, make sure everything is working correctly inside Tibia. Have fun!"
  },
  "tx-faq1q": {
    "pt-BR":"Isso é legal? Qual é a posição da CipSoft sobre essa ferramenta?",
    "en-GB":"Is this even legal? What's CipSoft position on this tool?"
  },
  "tx-faq1a": {
    "pt-BR":"R: I hope it is, we will see about that soon. :)",
    "en-GB":"A: I hope it is, we will see about that soon. :)"
  },
  "tx-faq2q": {
    "pt-BR":"Como isso funciona? É seguro?",
    "en-GB":"How does it work? Is it safe?"
  },
  "tx-faq2a": {
    "pt-BR":"R: Os dois clientes usam arquivos de texto para armazenar as hotkeys, assim como outras opções do cliente, mas em formatos diferentes. Esta ferramenta faz a leitura do formato antigo (.cfg), identifica as hotkeys e atualiza o novo formato (.json) com elas. Fique a vontade para abrir o arquivo .json gerado com qualquer editor de texto e comparar com o original.",
    "en-GB":"A: Both clients use text files to store hotkeys, as well as other client customizations, but in very different formats. This tool reads the old format (.cfg), parses the hotkeys and updates the new format (.json) with them. Feel free to open the generated .json file with any text editor and search for things that weren't there before."
  },
  "tx-faq3q": {
    "pt-BR":"Não deu certo! O que devo fazer?",
    "en-GB":"It didn't work! What should I do?"
  },
  "tx-faq3a": {
    "pt-BR":"R: Se por algum motivo o novo arquivo não der o resultado esperado, você deve apagá-lo e usar o arquivo de backup que você criou (cirou, né?). Se você não tiver um arquivo de backup, simplesmente apague o arquivo que baixou. O cliente do Tibia criará um novo arquivo utilizando as configurações padrão.",
    "en-GB":"A: If for any reason the new file doesn't behave as expected, you should delete it and use the backup file you created (you did, didn't you?). If you didn't create a backup file, just delete the downloaded file. The Tibia client will generate a new configuration file with the default settings if it can't find one."
  },
  "tx-faq4q": {
    "pt-BR":"A migração será feita nas hotkeys 'Chat On' ou 'Chat Off'?",
    "en-GB":"Does it change 'Chat On' or 'Chat Off' hotkey sets?"
  },
  "tx-faq4a": {
    "pt-BR":"R: Considerando que apenas a opção 'Chat On' existe no Tibia 10, apenas essas serão alteradas. O modo 'Chat Off' deverá continuar da mesma forma que estava anteriormente.",
    "en-GB":"A: Considering only the 'Chat On' mode exists on Tibia 10, only these are affected. 'Chat Off' mode should stay exactly the way you had it before."
  },
  "tx-faq5q": {
    "pt-BR":"O que vai acontecer com minhas outras configurações do cliente, como tipo de HUD e controle do mouse?",
    "en-GB":"What happens with my other client settings, such as HUD style and mouse controls?"
  },
  "tx-faq5a": {
    "pt-BR":"R: Nada. A ferramenta altera apenas as hotkeys.",
    "en-GB":"A: Nothing. The tool only changes hotkeys."
  },
  "tx-faq6q": {
    "pt-BR":"O que vai acontecer com minhas hotkeys do Tibia 11 que não são possíveis no Tibia 10?",
    "en-GB":"What will happen with my Tibia 11 hotkeys that aren't possible on Tibia 10?"
  },
  "tx-faq6a": {
    "pt-BR":"R: Nada também. Se você tiver hotkeys que não eram permitidas no Tibia 10 (como Alt + Fx, or usando teclado numérico), eles não serão alteradas. Mas lembre-se de testá-las antes de sair fazendo loucuras.",
    "en-GB":"A: Nothing as well. If you had hotkeys that weren't allowed on Tibia 10 (like Alt + Fx, or numeric keyboard), they should stay the same. But make sure you test them before doing something crazy."
  },
  "tx-faq7q": {
    "pt-BR":"Quem é você? Por que fez isso? Qual seu objetivo secreto?",
    "en-GB":"Who are you? Why are you doing this? What's your hidden agenda?"
  },
  "tx-faq7a": {
    "pt-BR":"R: O nome do meu personagem é Lee kun, e criei esta ferramenta porque é divertido. E também mais fácil que as coisas que eu realmente deveria estar fazendo :(. Meu objetivo secreto é secreto por um motivo!",
    "en-GB":"A: My character name is Lee kun, and I do it because it's fun. Also easier than the other things I should be doing instead :(. My hidden agenda is hidden for a reason!"
  },
};

