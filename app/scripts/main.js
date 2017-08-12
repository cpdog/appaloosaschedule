(function(){
  angular.module('schedule',['angular.filter','angularMoment'])
    .controller('mainViewCtrl', function($filter, $interval, $window){
      var vm = this;

      vm.myEvents = angular.fromJson($window.localStorage.getItem('myEvents')) || [];
      vm.FilterStage = null;
      vm.ShowingAllEvents = true;
      vm.ShowMyScheduleOnly = 'false';
      vm.ShowAnyTimeEvents = 'false';
      vm.selectedDay = '9/3/2016';

      if (new Date() > new Date(2016,8,4,4)) {
        vm.selectedDay = '9/4/2016';
      }

      if (new Date() > new Date(2016,8,5)) {
        vm.ShowAnyTimeEvents = 'true';
      }

      vm.FilterStage = '';
      vm.selectedBand = '';

      vm.Date = new Date();
      var schedule = [
        {
          Event: 'Bud\'s Collective',
          StartTime: new Date(2016,8,3,11,0),
          Endtime: new Date(2016,8,3,11,30),
          Where: 'Main Stage'
        },
        {
          Event: 'Gothard Sisters',
          StartTime: new Date(2016,8,3,12),
          Endtime: new Date(2016,8,3,12,45),
          Where: 'Main Stage'
        },
        {
          Event: 'Six-String Soldiers',
          StartTime: new Date(2016,8,3,13,15),
          Endtime: new Date(2016,8,3,14,0),
          Where: 'Main Stage'
        },
        {
          Event: 'Bumper Jacksons',
          StartTime: new Date(2016,8,3,14,30),
          Endtime: new Date(2016,8,3,15,30),
          Where: 'Main Stage'
        },
        {
          Event: 'Socks in the Frying Pan',
          StartTime: new Date(2016,8,3,16,0),
          Endtime: new Date(2016,8,3,17,0),
          Where: 'Main Stage'
        },
        {
          Event: 'The Accidentals',
          StartTime: new Date(2016,8,3,17,30),
          Endtime: new Date(2016,8,3,18,30),
          Where: 'Main Stage'
        },
        {
          Event: 'Mipso',
          StartTime: new Date(2016,8,3,19,0),
          Endtime: new Date(2016,8,3,20,15),
          Where: 'Main Stage'
        },
        {
          Event: 'Humming House',
          StartTime: new Date(2016,8,3,20,30),
          Endtime: new Date(2016,8,3,21,30),
          Where: 'Main Stage'
        },
        {
          Event: 'Scythian',
          StartTime: new Date(2016,8,3,22,0),
          Endtime: new Date(2016,8,3,23,15),
          Where: 'Main Stage'
        },
        {
          Event: 'Ben-David Warner',
          StartTime: new Date(2016,8,3,11,30),
          Endtime: new Date(2016,8,3,12,0),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Bumper Jacksons',
          StartTime: new Date(2016,8,3,12,45),
          Endtime: new Date(2016,8,3,13,15),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Moore Brothers',
          StartTime: new Date(2016,8,3,14,0),
          Endtime: new Date(2016,8,3,14,30),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Low Water Bridge',
          StartTime: new Date(2016,8,3,15,30),
          Endtime: new Date(2016,8,3,16,0),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Kenny Kohlhaas',
          StartTime: new Date(2016,8,3,17,0),
          Endtime: new Date(2016,8,3,17,30),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Duskwhales',
          StartTime: new Date(2016,8,3,18,30),
          Endtime: new Date(2016,8,3,19,0),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Six-String Soldiers',
          StartTime: new Date(2016,8,3,20,15),
          Endtime: new Date(2016,8,3,20,30),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Billy Strings',
          StartTime: new Date(2016,8,3,21,30),
          Endtime: new Date(2016,8,3,22,0),
          Where: 'Saloon Stage'
        },
        {
          Event: 'Low Water Bridge',
          StartTime: new Date(2016,8,3,11,0),
          Endtime: new Date(2016,8,3,11,30),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Swing Theory',
          StartTime: new Date(2016,8,3,12,0),
          Endtime: new Date(2016,8,3,13,0),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Gothard Sisters',
          StartTime: new Date(2016,8,3,13,30),
          Endtime: new Date(2016,8,3,14,30),
          Where: 'Ranch Stage'
        },
        {
          Event: 'The Joybells',
          StartTime: new Date(2016,8,3,15,0),
          Endtime: new Date(2016,8,3,15,45),
          Where: 'Ranch Stage'
        },
        {
          Event: 'The Boyle School',
          StartTime: new Date(2016,8,3,15,50),
          Endtime: new Date(2016,8,3,16,10),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Hillbilly Thomists',
          StartTime: new Date(2016,8,3,16,30),
          Endtime: new Date(2016,8,3,17,30),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Marie Miller\'s Girl Power Hour',
          Artist: 'Marie Miller',
          StartTime: new Date(2016,8,3,18,0),
          Endtime: new Date(2016,8,3,19,30),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Billy Strings',
          StartTime: new Date(2016,8,3,19,30),
          Endtime: new Date(2016,8,3,20,30),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Karikatura',
          StartTime: new Date(2016,8,3,21,0),
          Endtime: new Date(2016,8,3,22,0),
          Where: 'Ranch Stage'
        },
        {
          Event: 'Patrick Mahon',
          StartTime: new Date(2016,8,3,11,0),
          Endtime: new Date(2016,8,3,11,30),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Hey\'thoven',
          StartTime: new Date(2016,8,3,12,0),
          Endtime: new Date(2016,8,3,13,30),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Alanna Boudreau',
          StartTime: new Date(2016,8,3,13,30),
          Endtime: new Date(2016,8,3,14,30),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Rebecca Roubion',
          StartTime: new Date(2016,8,3,15,0),
          Endtime: new Date(2016,8,3,16,0),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Lowland Hum',
          StartTime: new Date(2016,8,3,16,30),
          Endtime: new Date(2016,8,3,17,30),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Adam & I',
          StartTime: new Date(2016,8,3,18,0),
          Endtime: new Date(2016,8,3,19,0),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Kevin Heider',
          StartTime: new Date(2016,8,3,19,30),
          Endtime: new Date(2016,8,3,20,30),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Penny & Sparrow',
          StartTime: new Date(2016,8,3,21,0),
          Endtime: new Date(2016,8,3,22,0),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Late Night Jam Feat. Scythian',
          Artist: 'Scythian',
          StartTime: new Date(2016,8,3,23,30),
          Endtime: new Date(2016,8,4,2,0),
          Where: 'Songwriter Stage'
        },
        {
          Event: 'Justina Miller',
          StartTime: new Date(2016,8,3,11,30),
          Endtime: new Date(2016,8,3,12,0),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Bud\'s Collective',
          StartTime: new Date(2016,8,3,12,30),
          Endtime: new Date(2016,8,3,13,30),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Little Hill Trio',
          StartTime: new Date(2016,8,3,14,0),
          Endtime: new Date(2016,8,3,15,0),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Moore Brothers',
          StartTime: new Date(2016,8,3,15,30),
          Endtime: new Date(2016,8,3,16,30),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Vinyl Tracks',
          StartTime: new Date(2016,8,3,17,0),
          Endtime: new Date(2016,8,3,18,0),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Will Overman Band',
          StartTime: new Date(2016,8,3,18,30),
          Endtime: new Date(2016,8,3,19,30),
          Where: 'Frontier Stage'
        },
        {
          Event: 'The Collection',
          StartTime: new Date(2016,8,3,20,0),
          Endtime: new Date(2016,8,3,21,0),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Duskwhales',
          StartTime: new Date(2016,8,3,21,30),
          Endtime: new Date(2016,8,3,22,0),
          Where: 'Frontier Stage'
        },
        {
          Event: 'Gothard Sisters',
          StartTime: new Date(2016,8,3,11,0),
          Endtime: new Date(2016,8,3,11,30),
          Where: 'Music Workshop'
        },
        {
          Event: 'The Accidentals',
          StartTime: new Date(2016,8,3,12,0),
          Endtime: new Date(2016,8,3,13,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Socks in the Frying Pan',
          StartTime: new Date(2016,8,3,13,0),
          Endtime: new Date(2016,8,3,14,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Fitzgeralds',
          StartTime: new Date(2016,8,3,14,0),
          Endtime: new Date(2016,8,3,15,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Penny & Sparrow',
          StartTime: new Date(2016,8,3,15,0),
          Endtime: new Date(2016,8,3,16,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Mipso',
          StartTime: new Date(2016,8,3,16,0),
          Endtime: new Date(2016,8,3,17,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Humming House',
          StartTime: new Date(2016,8,3,17,0),
          Endtime: new Date(2016,8,3,18,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Karikatura',
          StartTime: new Date(2016,8,3,18,0),
          Endtime: new Date(2016,8,3,19,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Lowland Hum',
          StartTime: new Date(2016,8,3,19,0),
          Endtime: new Date(2016,8,3,20,0),
          Where: 'Music Workshop'
        },
        {
          Event: 'Cake For Dinner',
          StartTime: new Date(2016,8,3,11,0),
          Endtime: new Date(2016,8,3,12,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Arts & Crafts',
          NonArtist:true,
          StartTime: new Date(2016,8,3,12,0),
          Endtime: new Date(2016,8,3,13,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Marie Miller',
          StartTime: new Date(2016,8,3,13,0),
          Endtime: new Date(2016,8,3,14,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Arts & Crafts',
          NonArtist:true,
          StartTime: new Date(2016,8,3,14,0),
          Endtime: new Date(2016,8,3,15,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Arts & Crafts',
          NonArtist:true,
          StartTime: new Date(2016,8,3,15,0),
          Endtime: new Date(2016,8,3,16,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Princess & Pirates Sing-Along',
          NonArtist:true,
          StartTime: new Date(2016,8,3,16,0),
          Endtime: new Date(2016,8,3,17,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Arts & Crafts',
          NonArtist:true,
          StartTime: new Date(2016,8,3,17,0),
          Endtime: new Date(2016,8,3,18,0),
          Where: 'Kids Program'
        },
        {
          Event: 'Kids Musical',
          NonArtist:true,
          StartTime: new Date(2016,8,3,18,0),
          Endtime: new Date(2016,8,3,19,0),
          Where: 'Kids Program'
        },

        { Event: 'Gothard Sisters', Where:'Main Stage', StartTime:new Date(2016,8,4,11,0), Endtime: new Date(2016,8,4,11,30)},
        { Event: 'The Fitzgeralds', Where:'Main Stage', StartTime:new Date(2016,8,4,12,0), Endtime: new Date(2016,8,4,13,0)},
        { Event: 'Penny & Sparrow', Where:'Main Stage', StartTime:new Date(2016,8,4,13,30), Endtime: new Date(2016,8,4,14,30)},
        { Event: 'Socks in the Frying Pan', Where:'Main Stage', StartTime:new Date(2016,8,4,15,0), Endtime: new Date(2016,8,4,16,0)},
        { Event: 'Billy Strings', Where:'Main Stage', StartTime:new Date(2016,8,4,16,30), Endtime: new Date(2016,8,4,17,30)},
        { Event: 'Marie Miller', Where:'Main Stage', StartTime:new Date(2016,8,4,18,0), Endtime: new Date(2016,8,4,19,0)},
        { Event: 'The Black Lillies', Where:'Main Stage', StartTime:new Date(2016,8,4,19,30), Endtime: new Date(2016,8,4,20,30)},
        { Event: 'Scythian', Where:'Main Stage', StartTime:new Date(2016,8,4,21,0), Endtime: new Date(2016,8,4,22,0)},
        { Event: 'Patrick Mahon', Where:'Saloon Stage', StartTime:new Date(2016,8,4,11,30), Endtime: new Date(2016,8,4,12,0)},
        { Event: 'Low Water Bridge', Where:'Saloon Stage', StartTime:new Date(2016,8,4,13,0), Endtime: new Date(2016,8,4,13,30)},
        { Event: 'Tellico', Where:'Saloon Stage', StartTime:new Date(2016,8,4,14,30), Endtime: new Date(2016,8,4,15,0)},
        { Event: 'Swing Theory', Where:'Saloon Stage', StartTime:new Date(2016,8,4,16,0), Endtime: new Date(2016,8,4,16,30)},
        { Event: 'Ben-David Warner', Where:'Saloon Stage', StartTime:new Date(2016,8,4,17,30), Endtime: new Date(2016,8,4,18,0)},
        { Event: 'Bud\'s Collective', Where:'Saloon Stage', StartTime:new Date(2016,8,4,19,0), Endtime: new Date(2016,8,4,19,30)},
        { Event: 'Fitzgeralds', Where:'Saloon Stage', StartTime:new Date(2016,8,4,20,30), Endtime: new Date(2016,8,4,21,0)},
        { Event: 'Catholic Mass', Where:'Ranch Stage', StartTime:new Date(2016,8,4,10,0), Endtime: new Date(2016,8,4,11,0)},
        { Event: 'Ben-David Warner', Where:'Ranch Stage', StartTime:new Date(2016,8,4,11,30), Endtime: new Date(2016,8,4,12,0)},
        { Event: 'Bud\'s Collective', Where:'Ranch Stage', StartTime:new Date(2016,8,4,12,30), Endtime: new Date(2016,8,4,13,30)},
        { Event: 'Gothard Sisters', Where:'Ranch Stage', StartTime:new Date(2016,8,4,14,0), Endtime: new Date(2016,8,4,15,0)},
        { Event: 'Six-String Soldiers', Where:'Ranch Stage', StartTime:new Date(2016,8,4,15,30), Endtime: new Date(2016,8,4,16,30)},
        { Event: 'Kevin Heider', Where:'Ranch Stage', StartTime:new Date(2016,8,4,17,0), Endtime: new Date(2016,8,4,18,0)},
        { Event: 'The Accidentals', Where:'Ranch Stage', StartTime:new Date(2016,8,4,18,30), Endtime: new Date(2016,8,4,19,30)},
        { Event: 'Humming House', Where:'Ranch Stage', StartTime:new Date(2016,8,4,20,0), Endtime: new Date(2016,8,4,21,0)},

        { Event: 'Hey\'thoven', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,11,30), Endtime: new Date(2016,8,4,12,0)},
        { Event: 'Adam & I', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,12,30), Endtime: new Date(2016,8,4,13,30)},
        { Event: 'Little Hill Trio', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,14,0), Endtime: new Date(2016,8,4,15,0)},
        { Event: 'Bryan Elijah Smith', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,15,30), Endtime: new Date(2016,8,4,16,30)},
        { Event: 'Lowland Hum', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,17,0), Endtime: new Date(2016,8,4,18,0)},
        { Event: 'Swing Theory', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,18,30), Endtime: new Date(2016,8,4,19,30)},
        { Event: 'Robbie Limon', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,20,0), Endtime: new Date(2016,8,4,21,0)},
        { Event: 'Latenight Jam w/ Marie Miller & Carbon Leaf', Artist:'Marie Miller', Where:'Songwriter Stage', StartTime:new Date(2016,8,4,22,30), Endtime: new Date(2016,8,5,1,0)},

        { Event: 'Dead Man\'s Hollow', Where:'Frontier Stage', StartTime:new Date(2016,8,4,11,30), Endtime: new Date(2016,8,4,12,30)},
        { Event: 'Maggie Valley Band', Where:'Frontier Stage', StartTime:new Date(2016,8,4,13,0), Endtime: new Date(2016,8,4,14,0)},
        { Event: 'Moore Brothers', Where:'Frontier Stage', StartTime:new Date(2016,8,4,14,30), Endtime: new Date(2016,8,4,15,30)},
        { Event: 'Low Water Bridge', Where:'Frontier Stage', StartTime:new Date(2016,8,4,16,0), Endtime: new Date(2016,8,4,17,0)},
        { Event: 'Tellico', Where:'Frontier Stage', StartTime:new Date(2016,8,4,17,30), Endtime: new Date(2016,8,4,18,30)},
        { Event: 'The Collection', Where:'Frontier Stage', StartTime:new Date(2016,8,4,19,0), Endtime: new Date(2016,8,4,19,45)},
        { Event: 'Dear Other', Where:'Frontier Stage', StartTime:new Date(2016,8,4,20,15), Endtime: new Date(2016,8,4,21,0)},

        { Event: 'Lowland Hum', Where:'Music Workshop', StartTime:new Date(2016,8,4,11,30), Endtime: new Date(2016,8,4,12,30)},
        { Event: 'Billy Strings', Where:'Music Workshop', StartTime:new Date(2016,8,4,12,30), Endtime: new Date(2016,8,4,13,30)},
        { Event: 'The Collection', Where:'Music Workshop', StartTime:new Date(2016,8,4,13,30), Endtime: new Date(2016,8,4,14,30)},
        { Event: 'The Accidentals', Where:'Music Workshop', StartTime:new Date(2016,8,4,14,30), Endtime: new Date(2016,8,4,15,30)},
        { Event: 'Humming House', Where:'Music Workshop', StartTime:new Date(2016,8,4,15,30), Endtime: new Date(2016,8,4,16,30)},
        { Event: 'The Black Lillies', Where:'Music Workshop', StartTime:new Date(2016,8,4,16,30), Endtime: new Date(2016,8,4,17,30)},
        { Event: 'Gothard Sisters', Where:'Music Workshop', StartTime:new Date(2016,8,4,17,30), Endtime: new Date(2016,8,4,18,30)},
        { Event: 'Penny & Sparrow', Where:'Music Workshop', StartTime:new Date(2016,8,4,18,30), Endtime: new Date(2016,8,4,19,30)},

        { Event: 'Arts & Crafts', Where:'Kids Program', StartTime:new Date(2016,8,4,11,0), Endtime: new Date(2016,8,4,12,0)},
        { Event: 'Arts & Crafts', Where:'Kids Program', StartTime:new Date(2016,8,4,12,0), Endtime: new Date(2016,8,4,13,0)},
        { Event: 'Marie Miller', Where:'Kids Program', StartTime:new Date(2016,8,4,13,0), Endtime: new Date(2016,8,4,14,0)},
        { Event: 'Arts & Crafts', Where:'Kids Program', StartTime:new Date(2016,8,4,14,0), Endtime: new Date(2016,8,4,15,0)},
        { Event: 'Cake For Dinner', Where:'Kids Program', StartTime:new Date(2016,8,4,15,0), Endtime: new Date(2016,8,4,16,0)},
        { Event: 'Arts & Crafts', Where:'Kids Program', StartTime:new Date(2016,8,4,16,0), Endtime: new Date(2016,8,4,17,0)},
        { Event: 'Princess & Pirate Singalong', Artist:'Little Hill Trio', Where:'Kids Program', StartTime:new Date(2016,8,4,17,0), Endtime: new Date(2016,8,4,18,0)},
        { Event: 'Kid\'s Musical', Artist:'Dear Other', Where:'Kids Program', StartTime:new Date(2016,8,4,18,0), Endtime: new Date(2016,8,4,19,0)}
        ];
        vm.allEvents = schedule;

      vm.MakeColor = function(where){
        switch(where){
          case 'Main Stage':
            return '-danger';
          case 'Saloon Stage':
            return '-primary';
          case 'Ranch Stage':
            return '-success';
          case 'Songwriter Stage':
            return '-warning';
          case 'Music Workshop':
            return '-default';
          case 'Kids Program':
            return '-info';
          case 'Frontier Stage':
            return '-frontier';

        }
      };

      vm.StageOrder = function (where){
        where = where.Where;
        switch(where){
          case 'Main Stage':
            return 2;
          case 'Saloon Stage':
            return 3;
          case 'Ranch Stage':
            return 4;
          case 'Songwriter Stage':
            return 5;
          case 'Music Workshop':
            return -1;
          case 'Kids Program':
            return 7;
          case 'Frontier Stage':
            return 6;
        }
      };

      vm.Date = new Date();

      $interval(function(){
        vm.Date = new Date();
      },60000);


      vm.toggleMySchedule = function(evt) {
        if (vm.myEvents.indexOf(evt) >=0){
          evt.UserGoing=false;
          vm.myEvents.splice(vm.myEvents.indexOf(evt),1);
        }
        else {
          evt.UserGoing = true;
          vm.myEvents.push(evt);

          if ($window.localStorage.getItem('showMyEventMessage') !== 'shown') {
            $window.localStorage.setItem('showMyEventMessage','shown');
            $window.swal({
              type:'success',
              'title': 'Added to schedule',
              'text': 'When you\'re done adding, change "All Scheduled" to "My Scheduled" for your customized schedule.',
              'confirmButtonText':'Awesome!'
            });
          }
        }

        $window.localStorage.setItem('myEvents', angular.toJson(vm.myEvents));

      };


      vm.sched = function() {

        var filtered = schedule.filter(function(el) {
          return (vm.ShowAnyTimeEvents === 'true' || el.Endtime > vm.Date) && new Date(el.StartTime).setHours(0,0,0,0) === new Date(vm.selectedDay).setHours(0,0,0,0);
        });

        filtered = filtered.filter(function(el) {
          return vm.FilterStage === '' || el.Where === vm.FilterStage;
        });

        filtered = filtered.filter(function(el) {
          return vm.ShowMyScheduleOnly === 'false' || el.UserGoing;
        });

        filtered = filtered.filter(function(el) {
          return vm.selectedBand === '' || (el.Artist || el.Event) === vm.selectedBand ;
        });

        return filtered;
      };

      vm.filterStageClick = function(where){
        vm.FilterStage = where;
      };

      function getKeyFromEvent(evt){
        return evt.Where + evt.Event + $window.moment(evt.StartTime).format('MM/DD/YYYY HH:mm');
      }

      function setupEvents() {
        var myEventDict = {};
        for (var i=0; i<vm.myEvents.length; i++ ) {
          var key = getKeyFromEvent(vm.myEvents[i]);
          myEventDict[key]=true;
        }

        vm.myEvents = [];

        for (i=0; i< vm.allEvents.length; i++){
          var evt = vm.allEvents[i];
          if (myEventDict[getKeyFromEvent(evt)]) {
            vm.myEvents.push(evt);
            evt.UserGoing=true;
          }
          else{
            evt.UserGoing=false;
          }
        }
      }

      setupEvents();
    });
})();


