//
//  Battery_Widget.swift
//  Battery Widget
//
//  Created by Burak Aydın on 30.09.2022.
//

import WidgetKit
import SwiftUI
import UIKit
import Foundation

// c_color: String
// group.com.battery.ReactNativeWidget
// Battery_WidgetEntryView
// Battery_Widget


extension UIColor {
    convenience init(hexString: String, alpha: CGFloat = 1.0) {
        let hexString: String = hexString.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        let scanner = Scanner(string: hexString)
        if (hexString.hasPrefix("#")) {
            scanner.scanLocation = 1
        }
        var color: UInt32 = 0
        scanner.scanHexInt32(&color)
        let mask = 0x000000FF
        let r = Int(color >> 16) & mask
        let g = Int(color >> 8) & mask
        let b = Int(color) & mask
        let red   = CGFloat(r) / 255.0
        let green = CGFloat(g) / 255.0
        let blue  = CGFloat(b) / 255.0
        self.init(red:red, green:green, blue:blue, alpha:alpha)
    }
    func toHexString() -> String {
        var r:CGFloat = 0
        var g:CGFloat = 0
        var b:CGFloat = 0
        var a:CGFloat = 0
        getRed(&r, green: &g, blue: &b, alpha: &a)
        let rgb:Int = (Int)(r*255)<<16 | (Int)(g*255)<<8 | (Int)(b*255)<<0
        return String(format:"#%06x", rgb)
    }
}

struct Shared:Decodable {
  let c_name: String,
      c_age: Int,
      c_email: String
  
}


struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), name: "NA", age: 0, email: "NA" )
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), name: "NA", age: 0, email: "NA")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        
      UIDevice.current.isBatteryMonitoringEnabled = true

        var entries: [SimpleEntry] = []
        var name = ""
        var age = 0
        var email = ""
       

        let sharedDefaults = UserDefaults.init(suiteName: "group.com.battery.ReactNativeWidget")
          if sharedDefaults != nil {
                do{
                  WidgetCenter.shared.reloadAllTimelines()
                  let shared = sharedDefaults?.string(forKey: "myAppData")
                  if(shared != nil){
                  let data = try JSONDecoder().decode(Shared.self, from: shared!.data(using: .utf8)!)
                      name = data.c_name
                      age = data.c_age
                      email = data.c_email
                  }
                }catch{
                  print(error)
                }
          }

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, name: name, age: age, email: email )
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let name: String
    let age: Int
    let email: String
}

struct CircleProgressView: View {

    @Binding var progress: Float
    
    var body: some View {
        ZStack {
            // grey background circle
            Circle()
                .stroke(lineWidth: 30)
                .opacity(0.3)
                .foregroundColor(Color(UIColor.systemGray3))

            // green base circle to receive shadow
            Circle()
                .trim(from: 0.0, to: CGFloat(min(self.progress, 0.5)))
                .stroke(style: StrokeStyle(lineWidth: 30, lineCap: .round, lineJoin: .round))
                .foregroundColor(Color(UIColor.systemGreen))
                .rotationEffect(Angle(degrees: 270.0))

            // point with shadow, clipped
            Circle()
                .trim(from: CGFloat(abs((min(progress, 1.0))-0.001)), to: CGFloat(abs((min(progress, 1.0))-0.0005)))
                .stroke(style: StrokeStyle(lineWidth: 30, lineCap: .round, lineJoin: .round))
                .foregroundColor(Color(UIColor.blue))
                .shadow(color: .black, radius: 10, x: 0, y: 0)
                .rotationEffect(Angle(degrees: 270.0))
                .clipShape(
                    Circle().stroke(lineWidth: 30)
                )
            
            // green overlay circle to hide shadow on one side
            Circle()
                .trim(from: progress > 0.5 ? 0.25 : 0, to: CGFloat(min(self.progress, 1.0)))
                .stroke(style: StrokeStyle(lineWidth: 30, lineCap: .round, lineJoin: .round))
                .foregroundColor(Color(UIColor.systemGreen))
                .rotationEffect(Angle(degrees: 270.0))


            
        }
        .padding()
    }
}

struct Battery_WidgetEntryView : View {
    var entry: Provider.Entry
  
  var batteryLevel: Float { UIDevice.current.batteryLevel }

    var body: some View {
      ZStack{
        Color(UIColor(hexString: entry.name))
          VStack(alignment: .leading) {
            
            Text("Battery "+"\(batteryLevel*100)%")
              .font(.system(size:15))
              .foregroundColor(Color(UIColor(hexString: entry.email)))
            
           
          
          
          }
          .padding(.all)
      }
        
    }
}
struct Battery_WidgetEntryViewMedium : View {
    var entry: Provider.Entry
  
  var batteryLevel: Float { UIDevice.current.batteryLevel }
  
    var body: some View {
      ZStack{
        Color(UIColor(hexString: entry.name))
          VStack(alignment: .leading) {
                  
    
            Text("Battery "+"\(Int(batteryLevel*100))%")
              .font(.system(size:15))
              
              
            
              
            Spacer()
            
            
           
          
          
          }
          .padding(.all)
      }
        
    }
}

@main
struct Battery_Widget: Widget {
    let kind: String = "Battery_Widget"

    var body: some WidgetConfiguration {
      
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
          Battery_WidgetEntryView(entry: entry)

          

        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
        .supportedFamilies([.systemSmall, .systemMedium])

    }
}

struct Battery_Widget_Previews: PreviewProvider {
    static var previews: some View {
      
      
      Group {
        Battery_WidgetEntryView(entry: SimpleEntry(date: Date(), name: "", age: 0, email: ""))
              .previewContext(WidgetPreviewContext(family: .systemSmall))

        Battery_WidgetEntryViewMedium(entry: SimpleEntry(date: Date(), name: "", age: 0, email: ""))
              .previewContext(WidgetPreviewContext(family: .systemMedium))
             }
      
            
      
    }
}
