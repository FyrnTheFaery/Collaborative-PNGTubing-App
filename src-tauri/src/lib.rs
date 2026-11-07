mod inputs;
use std::{collections::HashMap, fs::{self, exists}, sync::Mutex};
use tauri::Manager;

use std::fs::DirBuilder;

// use device_query::{DeviceQuery, DeviceState, MouseState, Keycode};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Open the model folder
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    
    let dir_builder: DirBuilder = DirBuilder::new();

    let model_dir_exists = exists("models").unwrap();
    if !model_dir_exists {
        dir_builder.create("models").unwrap();
    }
    assert!(fs::metadata("models").unwrap().is_dir());

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        // .manage(inputs::ChannelManager{Mutex::new(HashMap::new())})
        .setup(|app| {
            // Manage the state here before any command runs
            app.manage(inputs::ChannelManager(Mutex::new(HashMap::new())));
            Ok(())
        })
        .on_window_event(|window, event| {
            // Stop any input streams the closed window left running
            if let tauri::WindowEvent::Destroyed = event {
                inputs::drop_window_channels(window);
            }
        })
        .invoke_handler(tauri::generate_handler![greet,
            inputs::init_mouse_stream,
            inputs::init_keyboard_stream,
            inputs::drop_channel])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
