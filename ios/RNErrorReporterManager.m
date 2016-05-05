//
//  RNFSManager.m
//  RNFSManager
//
//  Created by Johannes Lumpe on 08/05/15.
//  Copyright (c) 2015 Johannes Lumpe. All rights reserved.
//

#import "RNErrorReporterManager.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@interface RNErrorReporterManager()

@end

@implementation RNErrorReporterManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(readSourcemaps:(RCTResponseSenderBlock)callback)
{
    NSString* path = [[NSBundle mainBundle] pathForResource:@"errorreporter_sourcemaps_ios" ofType:@"ttf"];
    NSData *data = [[NSFileManager defaultManager] contentsAtPath:path];
    NSString *base64Content = [data base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    
    if (!base64Content) {
        return callback(@[@{
                              @"description": @"No files",
                              @"code": @"404",
                              }]
                        );
    }
    
    callback(@[[NSNull null], base64Content]);
}

@end
