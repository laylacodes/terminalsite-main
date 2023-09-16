<template>
  <div class="terminal" ref="terminal">
    <div class="terminal" :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }"></div>
    <ul>
      <CommandLine v-for="(command, index) in commands" :user="command[0]" :domain="domain" :dir="dir" :cmd="command[1]"
        :key="command[1] + index" />
    </ul>
    <Prompt :user="user" :domain="domain" :dir="dir" ref="prompt" />

  </div>
</template>

<script>
import CommandLine from './CommandLine'
import Prompt from './Prompt'
import axios from 'axios'

export default {
  props: {
    isDarkMode: Boolean
  }, // Define isDarkMode as a Boolean prop
  name: 'Terminal',
  components: {
    CommandLine,
    Prompt
  },
  data: function () {
    return {
      user: 'guest',
      domain: 'layla.sh',
      dir: '~',
      advice: '',
      commands: [
        ['root', 'welcome']
      ]
    }
  },
  mounted: function () {
    this.getAdvice()
    this.$refs.prompt.focus()
  },
  updated: function () {
  },
  methods: {
    addCommand: function (user, cmd) {
      this.commands.push([user, cmd])
    },
    run: function (user, cmd) {
      if (cmd === 'advice' || cmd === 'Advice') {
        return this.motd()
      } else if (cmd === 'welcome') {
        return this.welcome(user)
      } else if (cmd === 'whoami' || cmd === 'Whoami') {
        return this.whoami()
      } else if (cmd === 'ls' || cmd === 'ls -a' || cmd === 'Ls' || cmd === 'Ls -a') {
        return this.ls(cmd)
      } else if (cmd === 'clear' || cmd === 'Clear') {
        return this.clear()
      } else if (cmd === 'cat' || cmd.startsWith('cat ') || cmd === 'Cat' || cmd.startsWith('Cat ')) {
        return this.cat(cmd)
      } else if (cmd === 'su' || cmd.startsWith('su ')) {
        return this.su(cmd)
      } else if (cmd === 'help' || cmd === 'Help') {
        return this.help()
      } else if (cmd === 'email' || cmd === 'Email') {
        return this.email()
      } else if (cmd === 'credits') {
        return this.credits()
      } else if (cmd === 'cute' || cmd === 'Cute') {
        return this.cute()
      } else if (cmd !== '') {
        return this.nope(cmd)
      }
    },
    getAdvice: function () {
      let vm = this
      axios.get('https://api.adviceslip.com/advice')
        .then(function (response) {
          vm.$nextTick(function () {
            vm.advice = response.data.slip.advice
          })
        })
    },
    welcome: function (user) {
      if (user === 'root') {
        const currentDate = new Date().toLocaleString('en-US', { timeZoneName: 'short' })
        return [
          ' ',
          '<i class="grey" style="font-size:26px">layla.sh⋆｡<i class="pink">°✩</i>🧋</i> ',
          ' ',
          '<i class="grey">•──────────────•°•<i class="pink">❀</i>•°•─────────────•</i>',
          // want to display the current date/time on this line below.
          `<i class="grey">Last login: ${currentDate} on ttys002 </i>`,
          ' ',
          '<i class="blue">{{ greetings }}</i> ',
          ' ',
          'I\'m <i class="blue">Layla</i>, a software engineer<i class="blue">/</i>content creator',
          ' ',
          'Type <i class="yellow">`help`</i> to get a list of commands',
          ' ',
          `<i class="grey">•──────────────•°•<i class="pink">❀</i>•°•─────────────•</i>`
        ]
      }
    },
    whoami: function () {
      return [
        '',
        `Welcome to my humble abode, <i class="user">${this.user}</i>, I'm @pilatesdev or <i class="blue">Layla.</i>`,
        'I\'m a full-time software engineer based in Austin, Texas, working at <i class="blue">Oracle</i> 🤠',
        ' ',
        'I spent two Summers at <i class="blue">Oracle</i> as a Software Engineer Intern in Summer 2022 and Summer 2023, before joining <i class="blue">Oracle</i> full-time as a Software Engineer September 2023!',
        'I\'m extremely passionate about crafting user-friendly tools and interfaces, making technology accessible and enjoyable for everyone 🥰',
        'Off-duty, you\'ll find me writing, reading, going to Pilates, and cherishing time with my husband, alongside our furry family of 4 dogs and 3 cats.',
        ' ',
        'Connect with me on <a href="https://twitter.com/pilatesdev" target="_blank">twitter</a> or <a href="https://linkedin.com/laylacodes" target="_blank">linkedin</a>.',
        'Or type <i class="yellow">email</i> for my email.'
      ]
    },
    ls: function (cmd) {
      if (!cmd.includes(' -a')) {
        return ['portfolio.md \t skills.json \t contact.md']
      } else {
        return ['portfolio.md \t skills.json \t contact.md \t <i class="yellow">.secret</i>']
      }
    },
    cat: function (cmd) {
      if (cmd.includes('portfolio.md')) {
        return [
          ' ',
          '🪷 <a href="https://youtube.com/pilatesdev">My Youtube</a> \t Tech content, tutorials, etc.',
          '\t\t <i class="grey">1.2K subscribers</i>',
          ' ',
          '🪷 <a href="https://laylacodes.hashnode.dev/">My Blog</a> \t How-to articles',
          '\t\t <i class="grey">50K views</i>',
          ' ',
          '🪷 <a href="https://blogs.oracle.com/jobsatoracle/post/layla-software-engineer-internship/">Oracle.com</a> \t Oracle featured me on their website!',
          '\t\t <i class="grey"></i>'
        ]
      } else if (cmd.includes('skills.json')) {
        return [
          '{',
          `   <i class="purple">frontEnd</i>: [ '<i class="blue">javascript</i>', '<i class="blue">vuejs</i>', '<i class="blue">typescript</i>', '<i class="blue">react</i>', '<i class="blue">sass</i>' ],`,
          `   <i class="purple">backEnd</i>: [ '<i class="blue">python</i>', '<i class="blue">java</i>', '<i class="blue">node.js</i>', '<i class="blue">sql</i>' ],`,
          `   <i class="purple">tools</i>: [ '<i class="blue">npm</i>', '<i class="blue">oracle db</i>', '<i class="blue">git</i>', '<i class="blue">pandas</i>', '<i class="blue">matplotlib</i>' ],`,
          `   <i class="purple">design</i>: [ '<i class="blue">figma</i>' ],`,
          `   <i class="purple">misc</i>: [ '<i class="blue">jsx</i>', '<i class="blue">tsx</i>' ]`,
          '}'
        ]
      } else if (cmd.includes('contact.md')) {
        return [
          '<a href="https://twitter.com/pilatesdev" target="_blank">pilatesdev @ twitter</a>',
          ' ',
          '<a href="https://linkedin.com/laylacodes" target="_blank">layla massey @ linkedin</a>',
          ' ',
          '<a href="https://instagram.com/pilatesdev" target="_blank">pilatesdev @ instagram</a>',
          ' ',
          'Type <i class="yellow">`email`</i> to get my email.'
        ]
      } else if (cmd.includes('.secret')) {
        if (this.user !== 'guest') {
          return [
            '<img src="https://statuscage.com/404" alt="Not Found Image" style="max-width:4200px; max-height: 400px;" />'
          ] // secwettttt
        } else {
          return [
            'cat: .secret: Permission denied for user <i class="user">guest</i>',
            'Type `<i class="yellow">su</i> <i class="light">USERNAME</i>` to login...'
          ]
        }
      } else {
        return [`${cmd}: No such file or directory`]
      }
    },
    su: function (cmd) {
      if (cmd === 'su' || cmd.includes('root')) {
        return [
          'su: Authentication failed. root is now isabled on this machine',
          'Log in with your personal username.'
        ]
      } else if (cmd.startsWith('su ') && cmd.length > 3) {
        this.user = cmd.replace('su ', '')
        return [`logged in as <i class="user">${this.user}</i>.`]
      } else {
        return ['su...who goes there? 🧐']
      }
    },
    clear: function () {
      this.commands = []
    },
    nope: function (cmd) {
      return [`command not found: ${cmd}`]
    },
    email: function () {
      return ['<i class="purple">laylacodez</i> {at} <i class="purple">gmail</i> {dot} <i class="purple">com</i>']
    },
    help: function () {
      return [
        'Use the commands below to get around:',
        '<i class="yellow">su</i><i class="light"> USERNAME</i> \t <i class="grey">log in</i>',
        '<i class="yellow">ls</i> \t\t <i class="grey">show files in directory</i>',
        '<i class="yellow">whoami</i> \t\t <i class="grey">learn more about me</i>',
        '<i class="yellow">cat</i> <i class="light">FILENAME</i> \t <i class="grey">show filename content</i>',
        // '<i class="yellow">cute</i> \t\t <i class="grey">get random cat pics</i>',
        '<i class="yellow">clear</i> \t\t <i class="grey">clear current screen</i>'
      ]
    }
    // cute: function () {
    //   // Create a random number to add to the URL to ensure a fresh image each time
    //   const randomNumber = Math.floor(Math.random() * 2000)
    //   const catImageUrl = `https://cataas.com/cat?width=200&cache=${randomNumber}`

    //   // Push the cat image URL into the catImageUrls array
    //   this.catImageUrls.push(catImageUrl)

    //   // Scroll to the bottom of the terminal to show the latest content
    //   this.$nextTick(() => {
    //     // Assuming you have a ref for the active prompt (for example, 'activePrompt')
    //     const activePrompt = this.$refs.activePrompt

    //     if (activePrompt) {
    //       activePrompt.scrollIntoView({ behavior: 'smooth', block: 'end' })
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss">
@import '../assets/colors';

// .terminal {
//   background: #42395D;
//   color: $white;
//   padding: 0.85rem;
// }
</style>
