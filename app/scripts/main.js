(function(){
  'use strict';
  angular.module('schedule',['angular.filter','angularMoment'])
    .controller('mainViewCtrl', function($filter, $interval, $window, $location){
      var vm = this;
      vm.shared = $location.search().shared;
      vm.myEvents = angular.fromJson($window.localStorage.getItem('myEvents_v2')) || {};
      vm.FilterStage = null;
      vm.ShowingAllEvents = true;

      if (vm.shared){
        vm.ShowSchedule = 'shared';
      }
      else {
        vm.ShowSchedule = 'all';
      }
      vm.ShowAnyTimeEvents = 'false';
      vm.selectedDay = '9/1/2017';
      vm.someEventsFavorited = false;


      if (new Date() > new Date(2017,8,2,2)) {
        vm.selectedDay = '9/3/2016';
      }
      else if (new Date() > new Date(2017,8,1,2)) {
        vm.selectedDay = '9/2/2016';
      }

      if (new Date() > new Date(2017,8,4)) {
        vm.ShowAnyTimeEvents = 'true';
      }

      vm.FilterStage = '';
      vm.selectedBand = '';

      vm.Date = new Date();
      var schedule = [
        {Id: 1, Event: 'Ben-David Warner', Where:'Clubhouse Stage', StartTime:new Date(2017,8,1,21,0), Endtime: new Date(2017,8,1,22,30)},
        {Id: 2, Event: 'Will Overman Band', Where:'Clubhouse Stage', StartTime:new Date(2017,8,1,23,0), Endtime: new Date(2017,8,2,0,30)},
        {Id: 3, Event: 'Humming House', Where:'Clubhouse Stage', StartTime:new Date(2017,8,2,23,30), Endtime: new Date(2017,8,3,0,30)},
        {Id: 4, Event: 'Forlorn Strangers', Where:'Clubhouse Stage', StartTime:new Date(2017,8,3,1,0), Endtime: new Date(2017,8,3,2,0)},
        {Id: 5, Event: 'Catholic Mass', NonArtist:true, Where:'Clubhouse Stage', StartTime:new Date(2017,8,3,9,30), Endtime: new Date(2017,8,3,10,30)},
        {Id: 6, Event: 'Scythian & Friends', Where:'Clubhouse Stage', StartTime:new Date(2017,8,3,23,30), Endtime: new Date(2017,8,4,1,30)},

        {Id: 7, Event: 'Gothard Sisters', Where:'Main Stage', StartTime:new Date(2017,8,2,12,0), Endtime: new Date(2017,8,2,13,15)},
        {Id: 8, Event: 'Runa', Where:'Main Stage', StartTime:new Date(2017,8,2,14,30), Endtime: new Date(2017,8,2,15,45)},
        {Id: 9, Event: 'Humming House', Where:'Main Stage', StartTime:new Date(2017,8,2,17,0), Endtime: new Date(2017,8,2,18,15)},
        {Id: 10, Event: 'Scythian', Where:'Main Stage', StartTime:new Date(2017,8,2,19,15), Endtime: new Date(2017,8,2,20,45)},
        {Id: 11, Event: 'Karikatura', Where:'Main Stage', StartTime:new Date(2017,8,2,21,45), Endtime: new Date(2017,8,2,23,0)},

        {Id: 12, Event: 'Will Overman Band', Where:'Saloon Stage', StartTime:new Date(2017,8,2,11,0), Endtime: new Date(2017,8,2,12,0)},
        {Id: 13, Event: 'Forlorn Strangers', Where:'Saloon Stage', StartTime:new Date(2017,8,2,13,15), Endtime: new Date(2017,8,2,14,30)},
        {Id: 14, Event: 'The Brother Brothers', Where:'Saloon Stage', StartTime:new Date(2017,8,2,15,45), Endtime: new Date(2017,8,2,17,0)},
        {Id: 15, Event: 'Six-String Soldiers', Where:'Saloon Stage', StartTime:new Date(2017,8,2,18,15), Endtime: new Date(2017,8,2,19,15)},
        {Id: 16, Event: 'The Plate Scrapers', Where:'Saloon Stage', StartTime:new Date(2017,8,2,20,45), Endtime: new Date(2017,8,2,21,45)},

        {Id: 17, Event: 'Cake For Dinner', Where:'Kids Stage', StartTime:new Date(2017,8,2,11,30), Endtime: new Date(2017,8,2,12,15)},
        {Id: 18, Event: 'Princess Singalong', Where:'Kids Stage', StartTime:new Date(2017,8,2,13,30), Endtime: new Date(2017,8,2,14,15)},

        {Id: 19, Event: 'Humming House', Where:'Workshop Zone', StartTime:new Date(2017,8,2,12,30), Endtime: new Date(2017,8,2,13,15)},
        {Id: 20, Event: 'Banjo Workshop', Where:'Workshop Zone', StartTime:new Date(2017,8,2,14,30), Endtime: new Date(2017,8,2,15,15)},
        {Id: 21, Event: 'Gothard Sisters', Where:'Workshop Zone', StartTime:new Date(2017,8,2,15,30), Endtime: new Date(2017,8,2,16,15)},
        {Id: 22, Event: 'Runa', Where:'Workshop Zone', StartTime:new Date(2017,8,2,16,45), Endtime: new Date(2017,8,2,17,30)},
        {Id: 22, Event: 'The Brother Brothers', Where:'Workshop Zone', StartTime:new Date(2017,8,2,18,0), Endtime: new Date(2017,8,2,18,45)},

        {Id: 23, Event: 'Tajci', Where:'Main Stage', StartTime:new Date(2017,8,3,11,0), Endtime: new Date(2017,8,3,12,0)},
        {Id: 24, Event: 'Fireside Collective', Where:'Main Stage', StartTime:new Date(2017,8,3,13,0), Endtime: new Date(2017,8,3,14,15)},
        {Id: 25, Event: 'Gothard Sisters', Where:'Main Stage', StartTime:new Date(2017,8,3,15,0), Endtime: new Date(2017,8,3,16,0)},
        {Id: 26, Event: 'Frank Solivan', Where:'Main Stage', StartTime:new Date(2017,8,3,16,30), Endtime: new Date(2017,8,3,17,45)},
        {Id: 27, Event: 'Scythian', Where:'Main Stage', StartTime:new Date(2017,8,3,19,0), Endtime: new Date(2017,8,3,20,30)},
        {Id: 28, Event: 'Eddie From Ohio', Where:'Main Stage', StartTime:new Date(2017,8,3,21,45), Endtime: new Date(2017,8,3,23,0)},

        {Id: 29, Event: 'Ben-David Warner', Where:'Saloon Stage', StartTime:new Date(2017,8,3,12,0), Endtime: new Date(2017,8,3,13,0)},
        {Id: 30, Event: 'Little Hill Trio', Where:'Saloon Stage', StartTime:new Date(2017,8,3,14,15), Endtime: new Date(2017,8,3,15,0)},
        {Id: 31, Event: 'Boyle School', Where:'Saloon Stage', StartTime:new Date(2017,8,3,16,0), Endtime: new Date(2017,8,3,16,30)},
        {Id: 32, Event: 'Karikatura', Where:'Saloon Stage', StartTime:new Date(2017,8,3,17,45), Endtime: new Date(2017,8,3,19,0)},
        {Id: 33, Event: 'Jesse Lege & Joel Savoy', Where:'Saloon Stage', StartTime:new Date(2017,8,3,20,30), Endtime: new Date(2017,8,3,21,45)},

        {Id: 34, Event: 'Sibling Rivalry', Where:'Kids Stage', StartTime:new Date(2017,8,3,11,45), Endtime: new Date(2017,8,3,12,30)},
        {Id: 35, Event: 'Gothard Sisters', Where:'Kids Stage', StartTime:new Date(2017,8,3,12,45), Endtime: new Date(2017,8,3,13,30)},
        {Id: 36, Event: 'Cake For Dinner', Where:'Kids Stage', StartTime:new Date(2017,8,3,15,45), Endtime: new Date(2017,8,3,16,30)},

        {Id: 37, Event: 'Frank Solivan', Where:'Workshop Zone', StartTime:new Date(2017,8,3,13,45), Endtime: new Date(2017,8,3,14,30)},
        {Id: 38, Event: 'Banjo Workshop', Where:'Workshop Zone', StartTime:new Date(2017,8,3,14,45), Endtime: new Date(2017,8,3,15,30)},
        {Id: 39, Event: 'Cajun Cooking & Music Revival', Where:'Workshop Zone', StartTime:new Date(2017,8,3,16,45), Endtime: new Date(2017,8,3,17,30)}


        ];
        vm.allEvents = schedule;

      /**
       * @return {string}
       */
      vm.MakeColor = function(where){
        switch(where){
          case 'Main Stage':
            return '-danger';
          case 'Saloon Stage':
            return '-primary';
          case 'Workshop Zone':
            return '-default';
          case 'Kids Stage':
            return '-info';
          case 'Clubhouse Stage':
            return '-warning';

        }
      };

      /**
       * @return {number}
       */
      vm.StageOrder = function (where){
        where = where.Where;
        switch(where){
          case 'Main Stage':
            return 2;
          case 'Saloon Stage':
            return 3;
          case 'Workshop Zone':
            return -1;
          case 'Kids Stage':
            return 7;
          case 'Clubhouse Stage':
            return 6;
        }
      };

      vm.Date = new Date();

      $interval(function(){
        vm.Date = new Date();
      },60000);


      function calculateShareId(){
        var idBitMask = bigInt.zero;
        for (var i=0; i< vm.allEvents.length; i++){
          if (vm.allEvents[i].UserGoing) {
            idBitMask = idBitMask.add(bigInt(2).pow(vm.allEvents[i].Id));
          }
        }

        return idBitMask.toString();
      }

      vm.shareOnFacebook = function(){
        FB.ui({
          method: 'share',
          display: 'popup',
          href: 'http://www.appaloosafestival.com/interactive-schedule/#?shared=' + calculateShareId(),
        });
      };

      vm.emailSchedule = function() {
        var subj = encodeURIComponent('My awesome Appaloosa schedule!');
        var msg = 'Check out all the AMAZING bands I\'m going to see at Appaloosa:\r\n';
        var unique={};
        for (var i=0; i< vm.allEvents.length; i++){
          if (vm.allEvents[i].UserGoing) {
            unique[vm.allEvents[i].Event]=1;
          }
        }

        for (var key in unique){
          if (unique.hasOwnProperty(key)){
            msg+= key + '\r\n';
          }
        }

        msg+='\n\nYou can check out my schedule here: http://www.appaloosafestival.com/interactive-schedule/#?shared=' + calculateShareId();

        $window.open('mailto:?subject=' + subj + '&body=' + encodeURIComponent(msg),'_self');
      };

      vm.toggleMySchedule = function(evt) {
        if (vm.myEvents[evt.Id]){
          evt.UserGoing=false;
          delete vm.myEvents[evt.Id];
        }
        else {
          evt.UserGoing = true;
          vm.myEvents[evt.Id]=true;

          if ($window.localStorage.getItem('showMyEventMessage_v2') !== 'shown') {
            $window.localStorage.setItem('showMyEventMessage_v2','shown');
            $window.swal({
              type:'success',
              'title': 'Added to schedule',
              'text': 'When you\'re done adding, change "All Scheduled" to "My Scheduled" for your customized schedule.',
              'confirmButtonText':'Awesome!'
            });
          }
        }

        $window.localStorage.setItem('myEvents_v2', angular.toJson(vm.myEvents));

        vm.someEventsFavorited = false;
        for (var i=0; i< vm.allEvents.length; i++) {
          if (vm.allEvents[i].UserGoing) {
            vm.someEventsFavorited = true;
          }
        }
      };


      vm.sched = function() {

        var filtered = schedule.filter(function(el) {
          return (vm.ShowAnyTimeEvents === 'true' || el.Endtime > vm.Date) && new Date(el.StartTime).setHours(0,0,0,0) === new Date(vm.selectedDay).setHours(0,0,0,0);
        });

        filtered = filtered.filter(function(el) {
          return vm.FilterStage === '' || el.Where === vm.FilterStage;
        });

        filtered = filtered.filter(function(el) {
          if (vm.ShowSchedule === 'all'){
            return true;
          }
          else if (vm.ShowSchedule === 'shared'){
            return el.SharedEvent;
          }
          else {
           return el.UserGoing;
          }
        });

        filtered = filtered.filter(function(el) {
          return vm.selectedBand === '' || (el.Artist || el.Event) === vm.selectedBand ;
        });

        return filtered;
      };

      vm.filterStageClick = function(where){
        vm.FilterStage = where;
      };

      function setupEvents() {
        var shared = vm.shared ? bigInt(vm.shared) : null;
        for (var i = 0; i < vm.allEvents.length; i++) {
          var evt = vm.allEvents[i];
          evt.UserGoing = !!vm.myEvents[evt.Id];
          vm.someEventsFavorited = vm.someEventsFavorited || evt.UserGoing;
          evt.SharedEvent = shared && shared.and(bigInt(2).pow(evt.Id)).neq(bigInt.zero.value);
        }

        if (shared) {
          $window.swal({
            type: 'info',
            'title': 'Someone shared a schedule with you!',
            'text': 'You\'re viewing a schedule that someone else shared with you. Probably because they\'re awesome and you\'re awesome. If you want to see all the events, change "Shared With Me" to "All Scheduled" to customize and share your own schedule!',
            'confirmButtonText': 'Awesome!'
          });
        }
      }

      setupEvents();
    });
})();


