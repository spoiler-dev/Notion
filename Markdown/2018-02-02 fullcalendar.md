# fullcalendar-schedule总结
`fullCalendar-schedule`
-------------------
> * 点击表头 title 即可出现日历，选择日期后跳转

### 1. 源代码
``` html
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
    <title>日程图</title>  
    <link rel="stylesheet" href='${ctxStatic}/assets/js/fullcalendar/fullcalendar.min.css' />
    <%-- <link rel="stylesheet" href='${ctxStatic}/assets/js/fullcalendar/fullcalendar.print.min.css' media='print' /> --%>
    <link rel="stylesheet" href='${ctxStatic}/assets/js/fullcalendar/scheduler.min.css'/>
    <style type="text/css">
        body {
            font-size: 14px;
            font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
        }
            
        #wrap {
            width: 1100px;
            margin: 0 auto;
        }
            
        #external-events {
            float: left;
            width: 150px;
            padding: 0 10px;
            border: 1px solid #ccc;
            background: #eee;
            text-align: left;
        }
            
        #external-events h4 {
            font-size: 16px;
            margin-top: 0;
            padding-top: 1em;
        }
            
        #external-events .fc-event {
            margin: 10px 0;
            cursor: pointer;
        }
            
        #external-events p {
            margin: 1.5em 0;
            font-size: 11px;
            color: #666;
        }
            
        #external-events p input {
            margin: 0;
            vertical-align: middle;
        }
        
        #calendar {
            float: right;
            width: 900px;
        }
    </style>

    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div id='wrap'>
                <div id='external-events'>
                    <h4>拖动事件</h4>
                    <div class='fc-event'>事件 1</div>
                    <div class='fc-event'>事件 2</div>
                    <div class='fc-event'>事件 3</div>
                    <div class='fc-event'>事件 4</div>
                    <div class='fc-event'>事件 5</div>
                    <p>
                    <input type='checkbox' id='drop-remove' />
                    <label for='drop-remove'>移除后消失</label>
                    </p>
                </div>				
                <div id='calendar'></div>
                <div style='clear:both'></div>			
            </div>
        </div>
    </div>

<%-- 		<script src='${ctxStatic}/assets/js/fullcalendar/moment.min.js'></script>
    <script src='${ctxStatic}/assets/js/fullcalendar/jquery.min.js'></script>
    <script src='${ctxStatic}/assets/js/fullcalendar/fullcalendar.min.js'></script>
    <script src='${ctxStatic}/assets/js/fullcalendar/scheduler.min.js'></script>
    <script src='${ctxStatic}/assets/js/fullcalendar/jquery-ui.min.js'></script>
    <script src='${ctxStatic}/assets/js/jedate.js'></script> --%>

    <script type="text/javascript">	
        var scripts = [null,'${ctxStatic}/assets/js/fullcalendar/moment.min.js','${ctxStatic}/assets/js/fullcalendar/fullcalendar.min.js','${ctxStatic}/assets/js/fullcalendar/scheduler.min.js',null];
        $('.page-content-area').ace_ajax('loadScripts', scripts, function() {	
        jQuery(function($) {
            $('#calendar').fullCalendar('today');	//获取当前日期	
            /* initialize the external events
            -----------------------------------------------------------------*/
        
            $('#external-events .fc-event').each(function() {
        
                // store data so the calendar knows to render an event upon drop
                $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true // maintain when user navigates (see docs on the renderEvent method)
                });
        
                // make the event draggable using jQuery UI
                $(this).draggable({
                zIndex: 998,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
                });
        
            });
        
        
            /* initialize the calendar
            -----------------------------------------------------------------*/
            $("#calendar").on("click",".fc-center",function(){
                $(".ui-datepicker-inline").show();
                $(this).attr("id","datepicker");			
                $(this).css({"position":"absolute","cursor": "pointer","z-index": "999"});
                $("#datepicker" ).datepicker({
                    dateFormat: 'yy-mm-dd',
                    dayNamesMin: ['日','一','二','三','四','五','六'],
                    monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                    onSelect: gotoDate
                });
                function gotoDate(){    
                    var pickdate = $("#datepicker").val();
                    $('#calendar').fullCalendar( 'gotoDate', pickdate);//进入指定日期
                    $(".ui-datepicker-inline").hide();
                    $(this).find("h2").text(pickdate);
                    $(this).css({"position":"","cursor": "pointer","z-index": ""});
                }
                
            });
            $('#calendar').fullCalendar({
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                //now: '2018-02-07',
                editable: true, // enable draggable events
                droppable: true, // this allows things to be dropped onto the calendar
                aspectRatio: 1.8,//纵横比
                scrollTime: '06:00', // undo default 6am scrollTime 起始时间
                header: {
                left: 'today prev,next',
                center: 'title',
                right: 'timelineDay'
                },
                eventOverlap:false,//一行一个事件
                defaultView: 'timelineDay',
                views: {
                timelineDay: {
                    buttonText: '单位：5分钟',
                    slotDuration: '00:05'
                },      
                timelineThreeDays: {
                    type: 'timeline',
                    duration: { days: 3 }
                }
                },
                resourceAreaWidth: '0%',//左侧菜单栏宽度			      
                resourceLabelText: 'Rooms',//左侧菜单栏名称
                resources: [
                { id: 'a', title: 'Auditorium A'},
                { id: 'b', title: 'Auditorium B', eventColor: 'green' },
                { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
                { id: 'd', title: 'Auditorium D', children: [
                    { id: 'd1', title: 'Room D1' },
                    { id: 'd2', title: 'Room D2' }
                ] },
                { id: 'e', title: 'Auditorium E' },
                { id: 'f', title: 'Auditorium F', eventColor: 'red' },
                { id: 'g', title: 'Auditorium G' },
                { id: 'h', title: 'Auditorium H' },
                { id: 'i', title: 'Auditorium I' },
                { id: 'j', title: 'Auditorium J' },
                { id: 'k', title: 'Auditorium K' },
                { id: 'l', title: 'Auditorium L' },
                { id: 'm', title: 'Auditorium M' },
                { id: 'n', title: 'Auditorium N' },
                { id: 'o', title: 'Auditorium O' },
                { id: 'p', title: 'Auditorium P' },
                { id: 'q', title: 'Auditorium Q' },
                { id: 'r', title: 'Auditorium R' },
                { id: 's', title: 'Auditorium S' },
                { id: 't', title: 'Auditorium T' },
                { id: 'u', title: 'Auditorium U' },
                { id: 'v', title: 'Auditorium V' },
                { id: 'w', title: 'Auditorium W' },
                { id: 'x', title: 'Auditorium X' },
                { id: 'y', title: 'Auditorium Y' },
                { id: 'z', title: 'Auditorium Z' }
                ],
                events: [
                { id: '1', resourceId: 'b', start: '2018-01-31T02:00:00', end: '2018-02-02T07:00:00', title: 'event 1' },
                { id: '2', resourceId: 'c', start: '2018-01-31T05:00:00', end: '2018-02-07T22:00:00', title: 'event 2' },
                { id: '3', resourceId: 'd', start: '2018-01-31', end: '2018-02-08', title: 'event 3' },
                { id: '4', resourceId: 'e', start: '2018-01-31T03:00:00', end: '2018-02-07T08:00:00', title: 'event 4' },
                { id: '5', resourceId: 'f', start: '2018-01-31T00:30:00', end: '2018-02-07T02:30:00', title: 'event 5' }
                ],
                drop: function(date, jsEvent, ui, resourceId) {
                console.log('drop', date.format(), resourceId);
        
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
                },
                eventReceive: function(event) { // called when a proper external event is dropped
                console.log('eventReceive', event);
                },
                eventDrop: function(event) { // called when an event (already on the calendar) is moved
                console.log('eventDrop', event);
                }
            });									
        });
    });
    </script>
```
