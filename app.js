var global = this
$(function () {
  var $window = $(window)
  var $document = $(document)
  var $console = $('#console')
  var $verticalbar = $('#verticalbar')
  var $horizontalbar = $('#horizontalbar')
  var $controller = $('#controller')
  var $scope = $('#scope')
  var $scopedata = $('#scope-data')
  var $log = $('#log')
  var $loglist = $('#log>ul')
  var $clear = $('#clear-btn')
  var barwidth = 4
  var clicking = false
  var orientation = ''
  var xlocation = 0.5
  var ylocation = 0.5
  var parser = new Parser()
  var jqconsole = $('#console').jqconsole('Browser JavaScript\n', '> ')
  var envMap = {}

  // Events
  $verticalbar.mousedown(function () {
    clicking = true
    orientation = 'x'
  })
  $horizontalbar.mousedown(function () {
    clicking = true
    orientation = 'y'
  })

  $document.mouseup(function () {
    clicking = false
  })

  $document.mousemove(function (e) {
    if (clicking === false) {
      return
    }
    if (orientation === 'x') {
      xlocation = e.clientX / $window.width()
      return resizew(e.clientX)
    } else {
      ylocation = e.clientY / $window.height()
      return resizeh(e.clientY)
    }
  })

  function resizeh (y) {
    $scope.css({
      height: y - 50 - (barwidth / 2)
    })
    $horizontalbar.css({
      height: barwidth,
      top: y - 50 - (barwidth / 2)
    })
    $log.css({
      height: $window.height() - (y + 50 + (barwidth / 2))
    })
  }
  function resizew (x) {
    $console.css({
      width: (x / $document.width()) * 100 + '%'
    })
    $verticalbar.css({
      width: barwidth,
      left: (x / $document.width()) * 100 + '%'
    })
    $controller.css({
      'margin-left': (x / $document.width()) * 100 + '%'
    })
  }

  $window.resize(function () {
    resizeh($window.height() * ylocation)
  })

  $clear.on('click', function () {
    for (var id in envMap) {
      delete window[id]
    }
    envMap = {}
    $scopedata.html('')
  })

  jqconsole.RegisterShortcut('R', function () {
    this.Reset()
    startPrompt()
  })

  // app logic
  function addScope (input) {
    var p = parser(input)
    for (var i = 0; i < p.length; i++) {
      var val = window[p[i]]
      var value
      try {
        if (typeof val === 'object') {
          if (Array.isArray(val)) {
            value = JSON.stringify(val, 0, 0)
          } else {
            value = JSON.stringify(val, 0, 2)
          }
        } else {
          value = val.toString().split('\n').join('<br>').split(' ').join('&nbsp;')
          if (value.indexOf('[native&nbsp;code]') > -1) {
            continue
          }
        }
      } catch (e) {
        value = val
      }
      envMap[p[i]] = {
        id: p[i],
        value: value,
        type: Object.prototype.toString.call(val).split(' ')[1].replace(']', '')
      }
    }

    var dataset = []
    for (var id in envMap) {
      dataset.push(envMap[id])
    }
    $scopedata.html('')
    dataset.forEach(function (el) {
      $scopedata.append('<tr><td>' + el.id + '</td><td>' + el.type + '</td><td>' + el.value + '</td></tr>')
    })
  }

  function addLog (input) {
    $loglist.prepend('<li>' + input + '</li>')
  }

  function startPrompt () {
    jqconsole.Prompt(true, function (input) {
      var output
      try {
        output = eval.call(global, input)
        if (typeof output === 'object') {
          if (Array.isArray(output)) {
            output = JSON.stringify(output, 0, 0)
          } else {
            output = JSON.stringify(output, 0, 2)
          }
        }
        addScope(input)
      } catch (e) {
        output = e
      }

      if (input) {
        addLog(input)
      }

      if (typeof output !== 'undefined') {
        jqconsole.Write(output + '\n', 'jqconsole-output')
      }
      startPrompt()
    })
  }

  // init
  resizew($document.width() * xlocation)
  resizeh($document.height() * ylocation)
  startPrompt()
})
