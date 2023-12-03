/* eslint-disable */
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
      if (cmd === 'motd' || cmd === 'Motd') {
        return this.motd()
      } else if (cmd === 'welcome') {
        return this.welcome(user)
      } else if (cmd === 'whoami' || cmd === 'Whoami') {
        return this.whoami()
      } else if (cmd === 'ls' || cmd === 'ls -a') {
        return this.ls(cmd)
      } else if (cmd === 'clear' || cmd === 'Clear') {
        return this.clear()
      } else if (cmd === 'cat' || cmd.startsWith('cat ')) {
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
          '<i class="typewriter" style="font-size:25px"><span>/layla.codes</span></i> ',
          
          '<i class="grey">•──────────────•°•<i class="grey">❀</i>•°•─────────────•</i>',
          // want to display the current date/time on this line below.
          `<i class="grey">Last login: ${currentDate} on ttys002 </i>`,
          ' ',
          ' ',
          `Welcome to my humble abode, <i class="user">${this.user}</i>, I'm @pilatesdev or <i class="pink" style="font-size:19px">Layla.</i>`,
          ' ',
          `I'm a content creator and full-time software engineer at <i class="pink" style="font-size:19px">Oracle</i>, right in the heart of Austin, Texas. My tech journey began with back-to-back summer internships at Oracle in 2022 and 2023, and I've been on an incredible ride since, evolving from an eager intern to a dedicated dev. I absolutely love crafting intuitive and accessible tech tools, it's like piecing together a puzzle for the digital world. 

When I'm not busy coding, you can find me immersed in a book, unwinding with some Pilates, or spending quality time with my husband and our delightful furry family of four dogs and three cats. Life's never dull! My passion extends beyond just work; I'm all about breaking down the barriers in tech, making it fun and approachable. It's not just about the code; it's about the stories we tell and the connections we make along the way. I believe in the power of technology to transform lives and I'm here to share that journey, one line of code at a time. 🧡

Whether it's through my day job, my social media, or just everyday adventures, I hope to inspire and motivate others to find their path in this dynamic and ever-evolving field :^)`,
          ' ',
          '<a href="https://twitter.com/pilatesdev" target="_blank">twitter</a>',
          '<a href="https://linkedin.com/in/laylamassey/">linkedin</a>',
          '<a href="https://laylacodes.hashnode.dev/">blog</a>',
          '<a href="https://instagram.com/pilatesdev" target="_blank">instagram</a>',
          '<a href="https://github.com/laylacodes" target="blank">github</a>',
          '<a href="https://twitch.com/laylacodes" target="blank">twitch</a>',
          '<a href="https://www.youtube.com/channel/UCHxeX6ap5owkHny6MSyIGig">youtube</a>',
          ' ',
          'Type <i class="teal">`help`</i> to get a list of commands'

        ]
      }
    },
    motd: function () {
      this.getAdvice()
      return [say({ text: this.advice })]
    },
    ls: function (cmd) {
      if (!cmd.includes(' -a')) {
        return ['portfolio.md \t skills.json \t '] // change these options
      } else {
        return ['portfolio.md \t skills.json \t contact.md \t <i class="yellow">.secret</i>']
      }
    },
    cat: function (cmd) {
      if (cmd.includes('portfolio.md')) {
        return [
          ' work in progress'
        ]
      } else if (cmd.includes('skills.json')) {
        return [
          '{',
          `   <i class="purple">frontEnd</i>: [ '<i class="blue">javascript</i>', '<i class="blue">vuejs</i>', '<i class="blue">typescript</i>', '<i class="blue">react</i>', '<i class="blue">scss</i>', '<i class="blue">sass</i>' ],`,
          `   <i class="purple">backEnd</i>: [ '<i class="blue">python</i>', '<i class="blue">java</i>', '<i class="blue">node.js</i>', '<i class="blue">oracle sql</i>', '<i class="blue">vite</i>', '<i class="blue">c++</i>', '<i class="blue">c#</i>', '<i class="blue">pandas</i>', '<i class="blue">matplotlib</i>' ],`,
          `   <i class="purple">tools</i>: [ '<i class="blue">jira</i>', '<i class="blue">gitlab</i>', '<i class="blue">git</i>' ],`,
          `   <i class="purple">design</i>: [ '<i class="blue">figma</i>' ],`,
          `   <i class="purple">misc</i>: [ '<i class="blue">jsx</i>', '<i class="blue">tsx</i>' ]`,
          '}'
        ]
      // } else if (cmd.includes('contact.md')) {
      //   ' '
      //   return [
      //   ]
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
          'su: Authentication failed. root is now disabled on this machine',
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
      return ['<i class="purple">layla</i> {at} <i class="purple">lay</i> {dot} <i class="purple">codes</i>']
    },
    help: function () {
      return [
        'Use the commands below to get around:',
        '<i class="yellow">su</i><i class="light"> USERNAME</i> \t <i class="grey">log in</i>',
        '<i class="yellow">ls</i> \t\t <i class="grey">show files in directory</i>',
        // '<i class="yellow">whoami</i> \t\t <i class="grey">learn more about me</i>',
        '<i class="yellow">cat</i> <i class="light">FILENAME</i> \t <i class="grey">show filename content</i>',
        // '<i class="yellow">motd</i> \t\t <i class="grey">get random advice</i>',
        '<i class="yellow">clear</i> \t\t <i class="grey">clear current screen</i>',
        '<i class="yellow">email</i> \t\t <i class="grey">collaboration inquiries only</i>'
      ]
    }
  }
}
</script>
<style lang="scss">
@import '../assets/colors';
</style>
