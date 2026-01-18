document.addEventListener('DOMContentLoaded', function () {
  const updateDateElement = document.getElementById('update-date')
  if (updateDateElement) {
    updateDateElement.textContent = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const navLinks = document.querySelectorAll('nav a')
  if (navLinks.length > 0) {
    navLinks.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          })

          history.pushState(null, null, targetId)
        }
      })
    })
  }

  const acronyms = [
    {
      term: 'IOC',
      description:
        'Indicator of Compromise - forensic artifacts that indicate a security breach'
    },
    {
      term: 'EDR',
      description:
        'Endpoint Detection and Response - security solutions that monitor endpoint activities'
    },
    {
      term: 'SIEM',
      description:
        'Security Information and Event Management - systems that aggregate and analyze security data'
    },
    {
      term: 'DMARC',
      description:
        'Domain-based Message Authentication, Reporting & Conformance - email authentication protocol'
    }
  ]

  acronyms.forEach(acronym => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    )

    let node
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim() === acronym.term) {
        const span = document.createElement('span')
        span.className = 'tooltip'
        span.textContent = acronym.term
        span.setAttribute('role', 'tooltip')
        span.setAttribute('aria-describedby', `tooltip-${acronym.term}`)

        const tooltip = document.createElement('span')
        tooltip.id = `tooltip-${acronym.term}`
        tooltip.className = 'tooltiptext'
        tooltip.textContent = acronym.description
        tooltip.setAttribute('role', 'tooltip')
        span.appendChild(tooltip)

        node.parentNode.replaceChild(span, node)
      }
    }
  })

  const animateOnScroll = () => {
    const articles = document.querySelectorAll('article')
    if (articles.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )

    articles.forEach(article => {
      article.style.opacity = 0
      article.style.transform = 'translateY(20px)'
      article.style.transition = 'all 0.5s ease-out'
      observer.observe(article)
    })
  }

  animateOnScroll()

  const darkModeToggle = document.getElementById('darkModeToggle')
  if (darkModeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light'

    document.documentElement.setAttribute('data-theme', currentTheme)
    darkModeToggle.setAttribute('aria-pressed', currentTheme === 'dark')

    darkModeToggle.addEventListener('click', function () {
      let theme = document.documentElement.getAttribute('data-theme')
      theme = theme === 'dark' ? 'light' : 'dark'

      document.documentElement.setAttribute('data-theme', theme)
      darkModeToggle.setAttribute('aria-pressed', theme === 'dark')
      localStorage.setItem('theme', theme)
    })
  }

  const codeSamples = document.querySelectorAll('.code-sample')
  codeSamples.forEach(sample => {
    sample.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        this.setAttribute('data-focus', 'true')
      }
    })

    sample.addEventListener('blur', function () {
      this.removeAttribute('data-focus')
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const caseStudyObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-value').forEach(stat => {
            const target = parseFloat(stat.dataset.target)
            const isCurrency = stat.textContent.includes('$')
            animateNumber(stat, 0, target, 1500, isCurrency)
          })

          entry.target.querySelectorAll('.phase').forEach((phase, i) => {
            phase.style.transitionDelay = `${i * 200}ms`
            phase.style.opacity = 1
            phase.style.transform = 'translateY(0)'
          })
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('.deep-dive-case').forEach(caseStudy => {
    caseStudy.querySelectorAll('.phase').forEach(phase => {
      phase.style.opacity = 0
      phase.style.transform = 'translateY(20px)'
      phase.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    })

    caseStudyObserver.observe(caseStudy)
  })

  function animateNumber (element, start, end, duration, isCurrency) {
    let startTime = null
    const format = value =>
      isCurrency ? `$${value.toFixed(1)}M` : Math.round(value)

    const animate = timestamp => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const value = start + progress * (end - start)

      element.textContent = format(value)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }
}) 
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle')
const nav = document.querySelector('nav')
const navLinks = document.querySelectorAll('nav a')

if (mobileMenuToggle && nav) {

  mobileMenuToggle.addEventListener('click', e => {
    e.stopPropagation()
    nav.classList.toggle('active')
    mobileMenuToggle.classList.toggle('active')
    document.body.classList.toggle('no-scroll')
  })

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active')
      mobileMenuToggle.classList.remove('active')
      document.body.classList.remove('no-scroll')
    })
  })

  document.addEventListener('click', e => {
    if (
      nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      nav.classList.remove('active')
      mobileMenuToggle.classList.remove('active')
      document.body.classList.remove('no-scroll')
    }
  })

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active')
      mobileMenuToggle.classList.remove('active')
      document.body.classList.remove('no-scroll')
    }
  })
}
